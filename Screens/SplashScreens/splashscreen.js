import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "@/constants/urls";
import axios from "axios";
import { ConsumersContext } from "@/Context/Consumer";
const { height } = Dimensions.get("window");

const Splashscreen = ({ navigation }) => {
  const { setConsumerName } = useContext(ConsumersContext);
  useEffect(() => {
    const getCurrentUser = async () => {
      // AsyncStorage.clear();
      const userId = await AsyncStorage.getItem("userId");
      const userType = await AsyncStorage.getItem("userRole");

      if (!userId && navigation) {
        const timer = setTimeout(() => {
          navigation.navigate("LoginScreen");
        }, 5000);

        return () => clearTimeout(timer);
      } else if (userId && userType == "consumer" && navigation) {
        if (userId) {
          axios
            .get(`${url}/api/user/${userId}`)
            .then((res) => {
              setConsumerName(res.data.user["name"]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        navigation.navigate("Home");
      } else if (userId && userType == "provider" && navigation)
        navigation.navigate("ProviderHomeScreen2");
    };
    getCurrentUser();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animations/welcomeColors.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      {/* <Text>Hello</Text> */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animations/tow.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(251, 245, 247)",
  },
  animationContainer: {
    width: "80%",
    alignItems: "center",
  },
  animation: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default Splashscreen;
