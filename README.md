# README

## Installation
To install dependencies -
```npm install```

To deploy the app in Expo -
```npx expo start```

## Dependencies
Other than React and React Native the app has the following dependencies - 

 1. `react-navigation` -  for the navigation stack
 2. `axios` - for HTTP calls
 3. React Native Elements(`@rneui`) - I use the `Button` from this library in one of my views. I had to import this library in the interest of time because the React Native Button doesn't allow much customization. This is something to be revisited later. 
 4. `expo-location`- for user location access
 5. `react-native-maps` - to show a map view and the user's location and the chargers on it. 

## Design
I have taken a functional approach to designing and building this app. Hence, I use React Functional Components and React Hooks.

  

The app uses an MVVM(Model, View, View Model) architecture. The View is comprised of the React Components. The Model and the View Model, in MVVM, are combined into one object, which we call the View Model here. The simplicity of the app justifies this approach. As we add more functionality to this app, we should consider splitting the View Model and Model into separate classes.

  

The View Models encapsulate the business logic in the app. Each View Model object has a state property that is used by the Views to update their UI and functions that implement user interactions. The interaction model of the app is as follows -

1.  The View Model is made available to the UI via Context and Provider.
2.  The user interacts with the UI
3.  That causes a View Model function to be invoked.
4.  The View Model modifies the state via a reducer, either directly or indirectly(e.g., via API calls).
5.  Modified state flows back to the UI via Context and Provider.

### Notes on extensibility
To create a new View Models do the following.

Define the type/interface for your View Model state.
```typescript
type ChargerReducerState = {
  chargers: ChargerInfo[];
  selectedCharger?: ChargerInfo;
};
```

Define the types/interfaces for your reducer and reducer actions.
```typescript
type ChargerReducerAction =
  | { type: "initialize" }
  | { type: "add_chargers"; payload: ChargerInfo[] }
  | { type: "select_charger"; payload: ChargerInfo };

const reducer = (
  state: ChargerReducerState,
  action: ChargerReducerAction
): ChargerReducerState => {
  switch (action.type) {
    case "initialize":
      return { chargers: [] };

    case "add_chargers":
      return { chargers: [...action.payload] };

    case "select_charger":
      return { ...state, selectedCharger: action.payload };

    default:
      throw new Error("unhandled Charger Action");
  }
};
```

Define the type/interface for your View Model object.
```typescript
interface ChargerViewModel {
  initialize: () => void;
  selectCharger: (charger: ChargerInfo) => void;
  getChargers: (currentLoc: CurrentLocation) => void;
  startCharging: (chargerID: string) => Promise<boolean>;
  readonly chargerState: ChargerReducerState;
}
```

Create a builder object that can build the View Model. This is needed so that we don't have to expose the underlying reducer and dispatcher, which are implementation details of your View Model,  to the View. 
```typescript
let modelBuilder: ContextBuilder<
  ChargerReducerAction,
  ChargerReducerState,
  ChargerViewModel
> = {
  build: (
    dispatch: React.Dispatch<ChargerReducerAction>,
    state: ChargerReducerState
  ) => {
    // console.log(`Building Model`);
    let model: ChargerViewModel = {
      initialize: initialize(dispatch),
      selectCharger: selectCharger(dispatch),
      getChargers: getChargers(dispatch),
      startCharging: startCharging(dispatch),
      chargerState: state,
    };
    return model;
  },
};
```

Pass the reducer, model builder, and the default state for your model to `createDataContext()` and get a Context and a Provider that you can use. 
```typescript
export const { provider: ChargerProvider, context: ChargerContext } =
  createDataContext(reducer, modelBuilder, { chargers: [] });
```

Wrap your App with the Provider.
```typescript
const App = () => {
  return (
    <LocationProvider>
      <ChargerProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="FindChargers" component={FindChargersScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ChargerProvider>
    </LocationProvider>
  );
};
```

Use the Context to access your View Model in your components.
```typescript
import { ChargerContext } from "../context/ChargerContext";

const chargerModel = useContext(ChargerContext);
```
## References



