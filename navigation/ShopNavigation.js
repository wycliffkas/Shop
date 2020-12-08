import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import Colors from "../constants/Colors";
import Cart from "../screens/shop/Cart";
import Orders from "../screens/shop/Orders";
import ProductDetail from "../screens/shop/ProductDetail";
import Products from "../screens/shop/Products";
import Auth from "../screens/user/Auth";
import EditProduct from "../screens/user/EditProduct";
import UserProduct from "../screens/user/UserProduct";


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const defaultOptions = {
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

const MainNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name="Shop" component={ShopNavigator} />
      <Stack.Screen name="Login" component={Auth} />
      {/* {isLoggedIn ? (
        <Stack.Screen name="Shop" component={ShopNavigator} />
      ) : (
        <Stack.Screen name="Login" component={Auth} />
      )} */}
    </Stack.Navigator>
  );
};

const ProductNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name="AllProducts" component={Products} />
      <Stack.Screen name="details" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name="UserProducts" component={UserProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1}}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => {}} />
      </View>
    </DrawerContentScrollView>
  );
};

const ShopNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={focused.activeTintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={focused.activeTintColor}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="UserProducts"
        component={AdminNavigator}
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={focused.activeTintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
