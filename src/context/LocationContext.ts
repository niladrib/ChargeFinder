import React from "react";
import createDataContext, { ContextBuilder } from "./createDataContext";

type LocationInfo = {
  latitude: number;
  longitude: number;
};

type LocationReducerAction = { type: "add_location"; payload: LocationInfo };

type LocationReducerState = {
  currentLocation?: LocationInfo;
};

const reducer = (
  state: LocationReducerState,
  action: LocationReducerAction
): LocationReducerState => {
  switch (action.type) {
    case "add_location":
      return { currentLocation: action.payload };

    default:
      throw new Error("unhandled Location Action");
  }
};

interface LocationModel {
  addLocation: (location: LocationInfo) => void;
  readonly locationState: LocationReducerState;
}

const addLocation = (dispatch: React.Dispatch<LocationReducerAction>) => {
  return (location: LocationInfo) => {};
};

let modelBuilder: ContextBuilder<
  LocationReducerAction,
  LocationReducerState,
  LocationModel
> = {
  build: (
    dispatch: React.Dispatch<LocationReducerAction>,
    state: LocationReducerState
  ) => {
    // console.log(`Building Model`);
    let model: LocationModel = {
      addLocation: addLocation(dispatch),
      locationState: state,
    };
    return model;
  },
};

export const { provider: LocationProvider, context: LocationContext } =
  createDataContext(reducer, modelBuilder, {});