import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import openChargeMap from "../api/openChargeMap";
import { ChargerContext } from "../context/ChargerContext";
import Map from "../components/Map";

const HomeScreen = () => {
  const context = useContext(ChargerContext);
  console.log(`chargers:${JSON.stringify(context.chargerState?.chargers)}`);
  return (
    <View>
      <Map />
      <Button
        color="#0064ff"
        title="Find Chargers Near Me"
        onPress={context.getChargers}
      />
    </View>
  );
};

export default HomeScreen;
