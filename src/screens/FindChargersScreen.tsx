import React, { useContext, useEffect, useState } from "react";
import { View, Button, FlatList } from "react-native";
import { ChargerContext } from "../context/ChargerContext";
import Map from "../components/Map";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
  LocationSubscription,
} from "expo-location";
import { FindChargersProps } from "./Props";
import { LocationContext } from "../context/LocationContext";
import ChargerItem from "../components/ChargerItem";

const FindChargersScreen = ({ navigation }: FindChargersProps) => {
  const [err, setErr] = useState<any>(null);
  const [subscriber, setSubscriber] = useState<LocationSubscription | null>(
    null
  );
  const locationModel = useContext(LocationContext);
  console.log(
    `FindChargersScreen curr loc=${
      locationModel!.locationState.currentLocation
    }`
  );
  const startTracking = async () => {
    try {
      await requestForegroundPermissionsAsync();
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => {
          console.log(`location=${JSON.stringify(location)}`);
          const latitude = location.coords.latitude;
          const longitude = location.coords.longitude;
          console.log(`locationModel2=${locationModel}`);
          locationModel!.addLocation({ latitude, longitude });
        }
      );
      setSubscriber(sub);
      console.log("received location permissions");
    } catch (error) {
      setErr(error);
    }
  };
  useEffect(() => {
    const focusUnsubscribe = navigation.addListener("focus", () => {
      console.log(`FindChargersScreen in focus`);
      startTracking();
    });
    const blurUnsubscribe = navigation.addListener("beforeRemove", () => {
      console.log(`FindChargersScreen in beforeRemove`);
      subscriber?.remove();
      setSubscriber(null);
    });
    return () => {
      focusUnsubscribe();
      blurUnsubscribe();
    };
  }, [navigation]);
  const chargerModel = useContext(ChargerContext);
  console.log(`chargerModel=${chargerModel}`);
  console.log(
    `chargers:${JSON.stringify(chargerModel?.chargerState?.chargers)}`
  );
  return (
    <View>
      <Map />
      <Button
        color="#0064ff"
        title="Find Chargers Near Me"
        onPress={() => {
          const currLoc = locationModel!.locationState.currentLocation;
          console.log(`Triggering charger search with loc=${currLoc}`);
          if (currLoc !== undefined) {
            chargerModel?.getChargers(currLoc);
          }
        }}
      />
      <FlatList
        data={chargerModel!.chargerState.chargers}
        renderItem={({ item }) => <ChargerItem charger={item} />}
        keyExtractor={(item) => item.ID}
      />
    </View>
  );
};

export default FindChargersScreen;
