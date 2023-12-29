import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";

const Map = () => {
  const locationModel = useContext(LocationContext);
  if (locationModel?.locationState.currentLocation === undefined) {
    console.log(`No current location`);
    return <View style={styles.defaultView} />;
  }
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: locationModel?.locationState.currentLocation.latitude,
        longitude: locationModel?.locationState.currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Circle
        center={{
          latitude: locationModel?.locationState.currentLocation.latitude,
          longitude: locationModel?.locationState.currentLocation.longitude,
        }}
        radius={30}
        strokeColor="rgba(0, 100, 255, 1.0)"
        fillColor="rgba(0, 100, 255, 0.3)"
      />
    </MapView>
  );
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
