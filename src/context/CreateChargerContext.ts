import React, { ReducerAction, ReducerState } from "react";
import openChargeMap from "../api/openChargeMap";
import createDataContext, { ContextBuilder}  from "./createDataContext";

type ChargerInfo = {
  ID: string;
  AddressInfo: { AddressLine1: string; Town: string; StateOrProvince: string };
};
type ChargerReducerAction =
  | { type: "initialize" }
  | { type: "add_charger"; payload: ChargerInfo };

type ChargerReducerState = { chargers: ChargerInfo[] };

const reducer = (state: ChargerReducerState, action: ChargerReducerAction): ChargerReducerState => {
  switch (action.type) {
    case "initialize":
      return { chargers: [] };

    case "add_charger":
      return { chargers: [...state.chargers, action.payload] };

    default:
      const _exhaustivenessCheck: never = action;
      return _exhaustivenessCheck;
  }
};

interface ChargerModel {
  initialize: () => void;
  addCharger: (charger: ChargerInfo) => void;
  getChargers: () => void; 
  readonly state: ChargerReducerState;
}

const initialize = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return () => {
    dispatch({ type: "initialize" });
  };
};

const addCharger = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return (charger: ChargerInfo) => {
    dispatch({ type: "add_charger", payload: charger });
  };
};

const getChargers = (dispatch: React.Dispatch<ChargerReducerAction>) => {
  return () => {
    openChargeMap
      .get("/poi", {
        params: {
          output: "json",
          maxresults: 100,
          compact: true,
          verbose: false,
          distance: 10,
          distanceunit: "miles",
          latitude: 39.19005300900668,
          longitude: -120.96667310680074,
        },
      })
      .then((response): void => {
        // console.log(`Got response=${JSON.stringify(response.data)}`);
        for (const {
          ID,
          AddressInfo: { AddressLine1, Town, StateOrProvince },
        } of response.data) {
          dispatch({
            type: "add_charger",
            payload: {
              ID,
              AddressInfo: { AddressLine1, Town, StateOrProvince },
            },
          });
        }
      })
      .catch((err): void => {
        console.log(`Got error when getting POIs=${err}`);
      });
  };
};

let builder: ContextBuilder<ChargerReducerAction, ChargerReducerState, ChargerModel> = {
  build: (dispatch: React.Dispatch<ChargerReducerAction>, 
    state: ChargerReducerState) => {
    let chargerCtx: ChargerModel = {
      initialize : initialize(dispatch),
      addCharger: addCharger(dispatch),
      getChargers: getChargers(dispatch),
      state
    };
    return chargerCtx;
  }
};

export const { provider: ChargerProvider, context: chargerContext } = createDataContext(reducer, builder , {chargers: []});
