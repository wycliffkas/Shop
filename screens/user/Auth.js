import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import Card from "../../components/ui/Card";
import Colors from "../../constants/Colors";
import * as authactions from "../../store/actions/auth";

const Auth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error has occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authactions.signup(email, password);
    } else {
      action = authactions.login(email, password);
    }
    setIsLoading(true);

    try {
      await dispatch(action);
      // props.navigation.navigate('ProductNavigator', { screen: 'AllProducts' });
      // props.navigation.navigate("MainNavigator", {
      //   screen: "Shop",
      //   params: {
      //     screen: "Products",
      //     params: {
      //       screen: "AllProducts",
      //     },
      //   },
      // });
      props.navigation.navigate("AllProducts");
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              id="email"
              keyboardType="email-address"
              required
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              id="password"
              keyboardType="default"
              required
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              password={password}
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    borderBottomColor: "#CCC",
  },
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxHeight: 400,
    maxWidth: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default Auth;
