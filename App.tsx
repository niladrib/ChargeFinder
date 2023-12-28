import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import { ChargerProvider, ChargerContext } from "./src/context/ChargerContext";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ChargerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ChargeFinder" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChargerProvider>
  );
};

export default App;
