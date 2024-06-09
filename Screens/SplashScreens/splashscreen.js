import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import PrimaryBtn from "..//../components/PrimaryBtn";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/splashscreen.jpg")}
        style={styles.image}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.btn}>
          <PrimaryBtn
            text={"Get Started as a provider"}
            onPressHandler={() => {
              console.log("pressed");
            }}
          ></PrimaryBtn>
        </View>
        <View style={styles.btn}>
          {/* <Button  title="Get Started as a provider"></Button> */}
          <PrimaryBtn
            text={"Get Started as a provider"}
            onPressHandler={() => {
              console.log("pressed");
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
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
