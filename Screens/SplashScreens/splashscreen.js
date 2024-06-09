import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import PrimaryBtn from "..//../components/PrimaryBtn";

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/splashscreen.jpg")}
        style={styles.image}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.btn}>
          <PrimaryBtn
            text={"Get Started as a Consumer"}
            onPressHandler={() => {
              navigation.navigate('ConsumerRegScreen');
            }}
          ></PrimaryBtn>
        </View>
        <View style={styles.btn}>
          {/* <Button  title="Get Started as a provider"></Button> */}
          <PrimaryBtn
            text={"Get Started as a Provider"}
            onPressHandler={() => {
              navigation.navigate('ProviderRegScreen');
            }}
          ></PrimaryBtn>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgb(251, 245, 247)",
  },
  image: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  btn: {
    flex: 1,
    marginHorizontal: 10,
    // backgroundColor: "red"
  },
});

export default SplashScreen;
