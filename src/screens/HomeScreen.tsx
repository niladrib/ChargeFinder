import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import openChargeMap from "../api/openChargeMap";
import { ChargerContext } from "../context/CreateChargerContext";

const HomeScreen = () => {
  const { getChargers, state } = useContext(ChargerContext);
  console.log(`chargers:${JSON.stringify(state.chargers)}`);
  return (
    <View>
      <Button
        color="#0064ff"
        title="Find Chargers Near Me"
        onPress={getChargers}
      />
    </View>
  );
};

export default HomeScreen;
