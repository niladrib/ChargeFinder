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
  | { type: "add_chargers"; payload: ChargerInfo[] }
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

    case "add_chargers":
      return { chargers: [...action.payload] };

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

interface ChargerViewModel {
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

const addChargers = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return (chargers: ChargerInfo[]) => {
    dispatch({ type: "add_chargers", payload: chargers });
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
      // console.log(`startCharging resp=${JSON.stringify(resp)}`);
      if (resp.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      // console.log(`startCharging err=${err}`);
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
          distance: 10,
          distanceunit: "miles",
          // latitude: 39.19005300900668,
          // longitude: -120.96667310680074,
          latitude: currentLoc.latitude,
          longitude: currentLoc.longitude,
        },
      })
      .then((response): void => {
        const chargersToAdd = response.data.map(
          (
            {
              ID,
              AddressInfo: {
                AddressLine1,
                Town,
                StateOrProvince,
                Latitude,
                Longitude,
              },
            }: ChargerInfo,
            index: number
          ) => {
            return {
              ID,
              AddressInfo: {
                AddressLine1,
                Town,
                StateOrProvince,
                Latitude,
                Longitude,
              },
            };
          }
        );
        // console.log(
        //   `dispatching chargersToAdd=${JSON.stringify(chargersToAdd)}`
        // );
        dispatch({
          type: "add_chargers",
          payload: chargersToAdd,
        });
      })
      .catch((err): void => {
        console.log(`Got error when getting POIs=${err}`);
      });
  };
};

let modelBuilder: ContextBuilder<
  ChargerReducerAction,
  ChargerReducerState,
  ChargerViewModel
> = {
  build: (
    dispatch: React.Dispatch<ChargerReducerAction>,
    state: ChargerReducerState
  ) => {
    // console.log(`Building Model`);
    let model: ChargerViewModel = {
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
