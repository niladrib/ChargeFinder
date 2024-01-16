import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeProps } from "./Props";

const HomeScreen = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      <Text>
        In the next screen we will ask for location permissions. We need to
        locate you to be able to find chargers near you.
      </Text>
      <Button
        color="#0064ff"
        title="Proceed"
        onPress={() => navigation.navigate("FindChargers")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 20,
  },
});

export default HomeScreen;
