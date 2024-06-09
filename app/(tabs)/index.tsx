import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ConsumerLogin from "../../Screens/ConsumerLoginScreen.js";
import ConsumerRegister from "../../Screens/Registeration/ConsumerRegisterScreen.js";
import ProviderRegister from "../../Screens/Registeration/ProviderRegisterScreen.js";
import SplashScreen from "../../Screens/SplashScreens/splashscreen.js";
import PrimaryBtn from "@/components/PrimaryBtn.js";
import  {MyStack} from '../../Navigations/StackNavigation.js'

export default function HomeScreen() {
  return (
    <>
      <MyStack></MyStack>
    </>
  );
}

const styles = StyleSheet.create({});
