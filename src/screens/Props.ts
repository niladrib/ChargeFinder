import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  FindChargers: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export { RootStackParamList, HomeProps };
