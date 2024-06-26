import i18n from "@/app/(tabs)/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import i18n from "../../app/(tabs)/i18n";
import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  // Map image names to their require paths
  const images = {
    "5.jpg": require("../../assets/images/5.jpg"),
    "9.jpg": require("../../assets/images/9.jpg"),
    "NoSearchResult.jpg": require("../../assets/images/NoSearchResult.jpg"),
  };

  const Card = ({ title, color, img, navigate }) => {
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: color }]}
        onPress={() => navigation.navigate(navigate)}
      >
        <Image style={styles.cardImage} source={images[img]} />
        <Text style={styles.cardText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.text}>Hello, Yasmeen</Text>

        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="earth"
            iconColor={"white"}
            size={30}
            onPress={() => {
              if (i18n.language === "en") {
                i18n.changeLanguage("ar");
              } else {
                i18n.changeLanguage("en");
              }
            }}
          />

          <IconButton
            icon="logout"
            iconColor={"white"}
            size={30}
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate("LoginScreen");
            }}
          />
        </View>

        {/* <Image
          style={styles.profilePicture}
          source={require("../../assets/images/person.jpg")}
        /> */}
      </View>

      <ScrollView horizontal style={styles.scrollViewContainer}>
        <Card
          title={t("Road Services")}
          color="white"
          img="9.jpg"
          navigate="Road Services"
        />
        <Card
          title={t("Consultation")}
          color="white"
          img="5.jpg"
          navigate="ChatbotScreen"
        />
      </ScrollView>

      <Text style={styles.requestsText}>{t("Current Requests")}</Text>

      <View style={styles.requestsContainer}>
        <Image source={images["NoSearchResult.jpg"]} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    margin: 2,
    backgroundColor: "rgb(251, 245, 247)",
  },
  homeHeader: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#9AB3CA",
    borderBottomRightRadius: 50,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    margin: 8,
    color: "white",
    fontSize: 18,
    fontFamily: "Oswald",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 15,
  },
  scrollViewContainer: {
    backgroundColor: "rgb(251, 245, 247)",
    paddingHorizontal: 10,
    marginVertical: 0,
  },
  card: {
    width: 200,
    height: 200,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardImage: {
    width: 200,
    height: 180,
    resizeMode: "contain",
  },
  cardText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
  },
  requestsContainer: {
    // flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
    overflow: "hidden",
  },
  requestsText: {
    margin: 5,
    color: "#3D3B3B",
    fontSize: 18,
    fontFamily: "Oswald",
  },
  image: {
    width: "90%",
    height: 370,
    resizeMode: "cover",
  },
});

export default Home;
