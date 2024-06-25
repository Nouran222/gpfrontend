import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { MyStack } from "../../Navigations/StackNavigation.js";
import { useFonts } from "expo-font";
import LoadingScreen from "../../Screens/SplashScreens/loadingScreen.js";
import Splashscreen from "@/Screens/SplashScreens/splashscreen.js";
import { MyTabs } from "../../Navigations/ProviderTopTabsNavigator/BottomTabsNavigation.js";
// import { MyTabs } from "../../Navigations/ProviderTopTabsNavigator/TopTabsNavigation.js";
import ProviderRegisterScreen from "@/Screens/Registeration/ProviderRegisterScreen.js";
import ProviderHomeScreen from "@/Screens/ProviderScreens/ProviderHomeScreen.js";
import { Appbar, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header} from 'react-native-elements'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const fonts = {
  Oswald: require("../../assets/fonts/static/Oswald-Bold.ttf"),
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
      {/* <MyTabs /> */}
      <LoadingScreen />
      {/* <Splashscreen /> */}
      {/* <MyStack></MyStack> */}
      {/* <ProviderRegisterScreen></ProviderRegisterScreen> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Oswald",
  },
});
