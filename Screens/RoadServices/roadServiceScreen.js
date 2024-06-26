import React, { useContext, useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import CustomButton from "@/components/CustomButton";
import { useTranslation } from "react-i18next";
import { ConsumersContext } from "@/Context/Consumer";
import i18n from "../../app/(tabs)/i18n";

const RoadServiceScreen = ({ navigation }) => {
  const { serviceType, setServiceType } = useContext(ConsumersContext);
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState({
    winch: false,
    fuel: false,
    tire: false,
    battery: false,
  });

  const handleCheckboxChange = (item) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const winchChecked = checkedItems.winch;

  const handleRequest = () => {
    const selectedItems = Object.keys(checkedItems).filter(
      (item) => checkedItems[item]
    );
    if (selectedItems.length === 0) {
      Alert.alert(t("Please select at least one service."));
      return;
    }

    setServiceType(selectedItems);
    navigation.navigate("Vehicles");
    // console.log("sel items", selectedItems);
  };

  useEffect(() => {
    console.log(serviceType);
  }, [serviceType]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.textHeader}>{t("Road Services")}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.row, { backgroundColor: "mistyrose" }]}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/winch.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>{t("Winch")}</Text>
          <Checkbox
            color={checkedItems.winch ? "#059212" : undefined}
            value={checkedItems.winch}
            onValueChange={() => handleCheckboxChange("winch")}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/fuel.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>{t("Fuel")}</Text>
          <Checkbox
            color={checkedItems.fuel ? "#059212" : undefined}
            value={checkedItems.fuel}
            onValueChange={() => handleCheckboxChange("fuel")}
            disabled={winchChecked}
          />
        </View>
        <View style={[styles.row, { backgroundColor: "mistyrose" }]}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/tire.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>{t("Tire")}</Text>
          <Checkbox
            color={checkedItems.tire ? "#059212" : undefined}
            value={checkedItems.tire}
            onValueChange={() => handleCheckboxChange("tire")}
            disabled={winchChecked}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/battery.jpg")}
              style={styles.image}
            />
          </View>
          <Text style={styles.text}>{t("Battery")}</Text>
          <Checkbox
            color={checkedItems.battery ? "#059212" : undefined}
            value={checkedItems.battery}
            onValueChange={() => handleCheckboxChange("battery")}
            disabled={winchChecked}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title={t("Request")} onPressHandler={handleRequest} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 2,
    justifyContent: "center",
  },
  homeHeader: {
    height: 90,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#9AB3CA",
    borderBottomRightRadius: 45,
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  textHeader: {
    flex: 1,
    marginLeft: 10,
    fontSize: 20,
    fontFamily: "Oswald",
    color: "white",
  },
  container: {
    flexGrow: 1,
    padding: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight:"bold"
    // fontFamily: "Oswald",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "silver",
    padding: 10,
    marginVertical: 5,
    borderRadius: 40,
    elevation: 5,
    height: "20%",
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default RoadServiceScreen;
