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

interface LocationViewModel {
  addLocation: (location: LocationInfo) => void;
  readonly locationState: LocationReducerState;
}

const addLocation = (dispatch: React.Dispatch<LocationReducerAction>) => {
  return (location: LocationInfo) => {
    dispatch({ type: "add_location", payload: location });
  };
};

let modelBuilder: ContextBuilder<
  LocationReducerAction,
  LocationReducerState,
  LocationViewModel
> = {
  build: (
    dispatch: React.Dispatch<LocationReducerAction>,
    state: LocationReducerState
  ) => {
    // console.log(`Building Model`);
    let model: LocationViewModel = {
      addLocation: addLocation(dispatch),
      locationState: state,
    };
    return model;
  },
};

export type { LocationViewModel as LocationModel };
export const { provider: LocationProvider, context: LocationContext } =
  createDataContext(reducer, modelBuilder, {});
