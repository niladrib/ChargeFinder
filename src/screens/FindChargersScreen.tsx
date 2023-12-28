import React, { useContext } from "react";
import { View, Button } from "react-native";
import { ChargerContext } from "../context/ChargerContext";
import Map from "../components/Map";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

const FindChargersScreen = () => {
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

export default FindChargersScreen;
