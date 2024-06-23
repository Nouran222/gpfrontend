import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { MyStack } from "../../Navigations/StackNavigation.js";
import { useFonts } from "expo-font";
import LoadingScreen from "../../Screens/SplashScreens/loadingScreen.js";
import Splashscreen from "@/Screens/SplashScreens/splashscreen.js";
import { MyTabs } from "../../Navigations/ProviderTopTabsNavigator/BottomTabsNavigation.js";
// import {MyTabs} from "../../Navigations/ProviderTopTabsNavigator/TopTabsNavigation.js"

const fonts = {
  Oswald: require("../../assets/fonts/static/Oswald-Bold.ttf"),
};

export default function HomeScreen() {
  const [fontsLoaded, loadFonts] = useFonts(fonts);

  // if (fontsLoaded) {
  //   return (
  //     <>
  //       <MyStack></MyStack>
  //     </>
  //   );
  // }

  return (
    <>
      <MyTabs />
      {/* <LoadingScreen /> */}
      {/* <Splashscreen navigation={undefined} /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Oswald",
  },
});
