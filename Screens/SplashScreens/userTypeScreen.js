import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import PrimaryBtn from "../../components/PrimaryBtn";
import CustomButton from "../../components/CustomButton"

const UserTypeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/images/splashscreen.jpg")}
        style={styles.image}
      />

      <View style={styles.buttonsContainer}>
        <View style={styles.btn}>
          <CustomButton
            title={"Register as Consumer"}
            onPressHandler={() => {
              navigation.navigate('ConsumerRegScreen');
            }}
          ></CustomButton>
          {/* <PrimaryBtn
            text={"Get Started as a Consumer"}
            onPressHandler={() => {
              navigation.navigate('ConsumerRegScreen');
            }}
          ></PrimaryBtn> */}
        </View>
        <View style={styles.btn}>
          {/* <Button  title="Get Started as a provider"></Button> */}
          {/* <PrimaryBtn
            text={"Get Started as a Provider"}
            onPressHandler={() => {
              navigation.navigate('ProviderRegScreen');
            }}
          ></PrimaryBtn> */}
          <CustomButton
            title={"Register as Provider"}
            onPressHandler={() => {
              navigation.navigate('ProviderRegScreen');
            }}
          ></CustomButton>
        </View>
      </View>
      {/* <View style={styles.tow}>
        <LottieView style={{ flex: 1 }} source={require('../../assets/animations/tow.json')} autoPlay loop />
      </View> */}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(251, 245, 247)",
    padding: 20,
  },
  image: {
    width: "90%",
    height: "30%",
    resizeMode: "contain",
    paddingVertical: '50%'
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  btn: {
    // flex: 1,
    marginHorizontal: 10,
    width: '50%'
    // backgroundColor: "red"
  },
  tow: {
    // height:300,
    width: '100%',
    aspectRatio: 1,
    flexShrink: 1
  }
});

export default UserTypeScreen;
