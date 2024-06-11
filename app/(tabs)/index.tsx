import React from "react";
import { StyleSheet } from "react-native";
import { MyStack } from '../../Navigations/StackNavigation.js';
import { useFonts } from 'expo-font';
import LoadingScreen from '../../Screens/SplashScreens/loadingScreen.js'
import Splashscreen from "@/Screens/SplashScreens/splashscreen.js";

const fonts = {
  'Oswald': require('../../assets/fonts/static/Oswald-Bold.ttf'),
};

export default function HomeScreen() {
  const [fontsLoaded, loadFonts] = useFonts(fonts);

  if (fontsLoaded) {
    return (
      <>
        <MyStack></MyStack>
      </>
    );
  }

  return (
    <>
      <LoadingScreen/>
      {/* <Splashscreen/> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Oswald',
  },
});

