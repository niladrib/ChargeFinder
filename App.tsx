import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import FindChargersScreen from "./src/screens/FindChargersScreen";
import { ChargerProvider, ChargerContext } from "./src/context/ChargerContext";
import { RootStackParamList } from "./src/screens/Props";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ChargerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FindChargers" component={FindChargersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ChargerProvider>
  );
};

export default App;
