import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import openChargeMap from "../api/openChargeMap";
import { chargerContext } from "../context/CreateChargerContext";

const HomeScreen = () => {
  const context = useContext(chargerContext);
  console.log(`chargers:${JSON.stringify(context.state?.chargers)}`);
  return (
    <View>
      <Button
        color="#0064ff"
        title="Find Chargers Near Me"
        onPress={context.getChargers}
      />
    </View>
  );
};

export default HomeScreen;
