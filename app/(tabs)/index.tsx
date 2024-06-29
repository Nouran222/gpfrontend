import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "../../Navigations/StackNavigation";
import { useFonts } from "expo-font";
import LoadingScreen from "../../Screens/SplashScreens/loadingScreen";
import * as Linking from "expo-linking";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      Home: "Home",
      Payment: "Payment",
    },
  },
};

const fonts = {
  Oswald: require("../../assets/fonts/static/Oswald-Bold.ttf"),
};

export default function HomeScreen() {
  const [fontsLoaded] = useFonts(fonts);

  if (fontsLoaded) {
    return (
      <GestureHandlerRootView>
        <NavigationContainer independent={true} linking={linking}>
          <MyStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }

  return <LoadingScreen />;
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Oswald",
  },
});
