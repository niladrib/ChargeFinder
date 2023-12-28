import React from "react";
import openChargeMap from "../api/openChargeMap";
import createDataContext from "./createDataContext";

type ChargerInfo = {
  ID: string;
  AddressInfo: { AddressLine1: string; Town: string; StateOrProvince: string };
};
type ChargerAction =
  | { type: "initialize" }
  | { type: "add_charger"; payload: ChargerInfo };

type ChargerState = { chargers: ChargerInfo[] };

const reducer = (state: ChargerState, action: ChargerAction): ChargerState => {
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

const initialize = (dispatch: React.Dispatch<ChargerAction>) => {
  return () => {
    dispatch({ type: "initialize" });
  };
};

const addCharger = (dispatch: React.Dispatch<ChargerAction>) => {
  return (charger: ChargerInfo) => {
    dispatch({ type: "add_charger", payload: charger });
  };
};

const getChargers = (dispatch: React.Dispatch<ChargerAction>) => {
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

export const { Provider: ChargerProvider, Context: ChargerContext } = createDataContext(reducer,
    { initialize, addCharger, getChargers}, 
    {chargers: []});
