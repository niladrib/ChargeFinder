import React from "react";
import openChargeMap from "../api/openChargeMap";
import createDataContext, { ContextBuilder } from "./createDataContext";
import evEnergy from "../api/evEnergy";

type ChargerInfo = {
  ID: string;
  AddressInfo: {
    AddressLine1: string;
    Town: string;
    StateOrProvince: string;
    Latitude: number;
    Longitude: number;
  };
};

type ChargerReducerAction =
  | { type: "initialize" }
  | { type: "add_charger"; payload: ChargerInfo }
  | { type: "select_charger"; payload: ChargerInfo };

type ChargerReducerState = {
  chargers: ChargerInfo[];
  selectedCharger?: ChargerInfo;
};

const reducer = (
  state: ChargerReducerState,
  action: ChargerReducerAction
): ChargerReducerState => {
  switch (action.type) {
    case "initialize":
      return { chargers: [] };

    case "add_charger":
      return { chargers: [...state.chargers, action.payload] };

    case "select_charger":
      return { ...state, selectedCharger: action.payload };

    default:
      throw new Error("unhandled Charger Action");
  }
};

type CurrentLocation = {
  latitude: number;
  longitude: number;
};

interface ChargerModel {
  initialize: () => void;
  selectCharger: (charger: ChargerInfo) => void;
  getChargers: (currentLoc: CurrentLocation) => void;
  startCharging: (chargerID: string) => Promise<boolean>;
  readonly chargerState: ChargerReducerState;
}

const initialize = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return () => {
    dispatch({ type: "initialize" });
  };
};

const selectCharger = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return (charger: ChargerInfo) => {
    dispatch({ type: "select_charger", payload: charger });
  };
};

const addCharger = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return (charger: ChargerInfo) => {
    dispatch({ type: "add_charger", payload: charger });
  };
};

const startCharging = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return async (chargerID: string): Promise<boolean> => {
    try {
      const resp = await evEnergy.post("/chargingsession", {
        user: 1,
        car_id: 1,
        charger_id: chargerID,
      });
      console.log(`startCharging resp=${JSON.stringify(resp)}`);
      if (resp.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(`startCharging err=${err}`);
      return false;
    }
  };
};

const getChargers = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return (currentLoc: CurrentLocation) => {
    openChargeMap
      .get("/poi", {
        params: {
          output: "json",
          maxresults: 100,
          compact: true,
          verbose: false,
          distance: 1,
          distanceunit: "miles",
          // latitude: 39.19005300900668,
          // longitude: -120.96667310680074,
          latitude: currentLoc.latitude,
          longitude: currentLoc.longitude,
        },
      })
      .then((response): void => {
        // console.log(`Got response=${JSON.stringify(response.data)}`);
        for (const {
          ID,
          AddressInfo: {
            AddressLine1,
            Town,
            StateOrProvince,
            Latitude,
            Longitude,
          },
        } of response.data) {
          dispatch({
            type: "add_charger",
            payload: {
              ID,
              AddressInfo: {
                AddressLine1,
                Town,
                StateOrProvince,
                Latitude,
                Longitude,
              },
            },
          });
        }
      })
      .catch((err): void => {
        console.log(`Got error when getting POIs=${err}`);
      });
  };
};

let modelBuilder: ContextBuilder<
  ChargerReducerAction,
  ChargerReducerState,
  ChargerModel
> = {
  build: (
    dispatch: React.Dispatch<ChargerReducerAction>,
    state: ChargerReducerState
  ) => {
    // console.log(`Building Model`);
    let model: ChargerModel = {
      initialize: initialize(dispatch),
      selectCharger: selectCharger(dispatch),
      getChargers: getChargers(dispatch),
      startCharging: startCharging(dispatch),
      chargerState: state,
    };
    return model;
  },
};

export const { provider: ChargerProvider, context: ChargerContext } =
  createDataContext(reducer, modelBuilder, { chargers: [] });
