import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import openChargeMap from "../api/openChargeMap";

const HomeScreen = () => {
  const apiKey = process.env.EXPO_PUBLIC_OPEN_CHARGE_MAP_API_KEY;
  console.log(`key=${apiKey}`);
  const findChargers = async () => {
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
        console.log(`Got response=${JSON.stringify(response.data)}`);
      })
      .catch((err): void => {
        console.log(`Got error when getting POIs=${err}`);
      });
  };
  return (
    <View>
      <Button title="Find Chargers Near Me" onPress={findChargers} />
    </View>
  );
};

export default HomeScreen;
