import React, { FunctionComponent, useContext } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";
import { Button } from "@rneui/base";
import { ChargerContext } from "../context/ChargerContext";

type ChargerItemProps = {
  charger: {
    ID: string;
    AddressInfo: {
      AddressLine1: string;
      Town: string;
      StateOrProvince: string;
      Latitude: number;
      Longitude: number;
    };
  };
};

const ChargerItem: FunctionComponent<ChargerItemProps> = ({
  charger: {
    ID,
    AddressInfo: { AddressLine1, Town, StateOrProvince, Latitude, Longitude },
  },
}) => {
  const chargerModel = useContext(ChargerContext);
  const showChargingStartErrrorAlert = () =>
    Alert.alert(
      "Error",
      "Failed to start charging. Please try another charger.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          chargerModel!.selectCharger({
            ID,
            AddressInfo: {
              AddressLine1,
              Town,
              StateOrProvince,
              Latitude,
              Longitude,
            },
          })
        }
      >
        <Text>{AddressLine1}</Text>
        <Text>{Town}</Text>
        <Text>{StateOrProvince}</Text>
      </TouchableOpacity>
      <View>
        <Button
          title="Start"
          onPress={async () => {
            // console.log(`Selected charger=${ID}`);
            if (chargerModel === null) {
              return;
            }
            try {
              const status = await chargerModel.startCharging(ID);
              if (!status) {
                showChargingStartErrrorAlert();
              }
            } catch (err) {}
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
});

export default ChargerItem;
