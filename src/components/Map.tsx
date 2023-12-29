import React, { FunctionComponent, useContext } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";

type MapProps = {
  currentLocation: {
    latitude?: number;
    longitude?: number;
  };
};

const Map: FunctionComponent<MapProps> = ({
  currentLocation: { latitude, longitude },
}) => {
  // const locationModel = useContext(LocationContext);
  if (typeof latitude === "undefined" || typeof longitude === "undefined") {
    console.log(`No current location`);
    return <View style={styles.defaultView} />;
  }
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        // latitude: locationModel?.locationState.currentLocation.latitude,
        // longitude: locationModel?.locationState.currentLocation.longitude,
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={{
          // latitude: locationModel?.locationState.currentLocation.latitude,
          // longitude: locationModel?.locationState.currentLocation.longitude,
          latitude,
          longitude,
        }}
        radius={30}
        strokeColor="rgba(0, 100, 255, 1.0)"
        fillColor="rgba(0, 100, 255, 0.3)"
      />
    </MapView>
  );
};

Map.defaultProps = {
  currentLocation: {},
};

const styles = StyleSheet.create({
  map: {
    height: 200,
  },
  defaultView: {
    height: 200,
    backgroundColor: "#f0f8ff",
  },
});

export default Map;
