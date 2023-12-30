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
To create more View Models, do the following.

You would define the type/interface for your View Model state.


You would define the types/interfaces for your reducer and reducer state.

You would define the type/interface for your View Model object.

You would create a builder object that can build the View Model. This is needed so that we don't have to expose the underlying reducer and dispatcher, which are implementation details of your View Model,  to the View. 

You would pass the reducer, model builder, and the default state for your model to `createDataContext()` and get a Context and a Provider that you can use. 

You would wrap your App with the Provider.

You would use the Context to access your View Model in your components.





