import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import HomeScreen from "components/homeScreen";
import SettingsScreen from "components/settingsScreen";
import "./global.css"
import RecievePage from "components/recieveScreen";
import PurchaseScreen from "components/purchaseScreen";

// Keep the splash screen visible until manual hiding
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Simulate loading process (API calls, asset loading, etc.)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync(); // Hide splash screen once ready
      }
    }

    prepareApp();
  }, []);

  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <Image source={require("./assets/SplashScreen.png")} style={styles.logo} />
      </View>
    );
  }

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Recieve" component={RecievePage} />
        <Stack.Screen name="Pay" component={PurchaseScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

// Styles
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A2ABCE", // Same as app.json
  },
  logo: {
    width: 200, // Adjust size
    height: 200, // Adjust size
    resizeMode: "contain",
  },
});
