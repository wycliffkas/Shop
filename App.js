import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import MainNavigator from "./navigation/ShopNavigation";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import productsReducer from "./store/reducers/products";
import ReduxThunk from "redux-thunk"

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  });

  // const store = createStore(rootReducer, applyMiddleware(ReduxThunk), composeWithDevTools());
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
