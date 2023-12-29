import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  FindChargers: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type FindChargersProps = NativeStackScreenProps<
  RootStackParamList,
  "FindChargers"
>;

// export { RootStackParamList, HomeProps };
