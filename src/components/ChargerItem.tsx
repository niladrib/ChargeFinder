import React, { FunctionComponent } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Button } from "@rneui/base";

type ChargerItemProps = {
  charger: {
    ID: string;
    AddressInfo: {
      AddressLine1: string;
      Town: string;
      StateOrProvince: string;
    };
  };
};

const ChargerItem: FunctionComponent<ChargerItemProps> = ({
  charger: {
    ID,
    AddressInfo: { AddressLine1, Town, StateOrProvince },
  },
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>{AddressLine1}</Text>
        <Text>{Town}</Text>
        <Text>{StateOrProvince}</Text>
      </TouchableOpacity>
      <View>
        <Button title="Select" />
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
