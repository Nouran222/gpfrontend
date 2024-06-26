import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ConsumerCard from "../../components/ProviderComponents/ConsumerCard";
import SwitchStatus from "./../../components/ProviderComponents/SwitchStatus";
import RequestScreen from "./RequestScreen";
import i18n from "../../app/(tabs)/i18n";
import { useTranslation } from "react-i18next";

const ProviderHomeScreen = ({ service, navigation, route }) => {
  const {t}=useTranslation()
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapRegion2, setMapRegion2] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const origin = { latitude: 37.78825, longitude: -122.4324 };
  const destination = { latitude: 37.79855, longitude: -122.4324 };
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [consumers, setConsumers] = useState([
    { id: "1", name: "Provider 1", distance: "2 km", carType: "Sedan" },
    { id: "2", name: "Provider 2", distance: "5 km", carType: "SUV" },
    { id: "3", name: "Provider 3", distance: "3 km", carType: "Sedan" },
    { id: "4", name: "Provider 4", distance: "7 km", carType: "SUV" },
  ]);

  // useEffect(() => {
  //   userLocation();
  // }, []);

  // const userLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();

  //   if (status === "granted") {
  //     let location = await Location.getCurrentPositionAsync({
  //       enableHighAccuracy: true,
  //     });

  //     //   console.log("loc is" + location.coords.latitude);

  //     setMapRegion({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   }
  // };
  const [isOpened, setIsOpened] = useState(false);
  const [isRequest, setIsRequest] = useState(true);
  const handleSwitchChange = (enabled) => {
    console.log(enabled);
    setIsOpened(enabled);
  };
  return (
    <>
      {isRequest ? (
        <RequestScreen navigation={navigation} servicePrice={50}></RequestScreen>
      ) : (
        <View style={styles.mapContainer}>
          <SwitchStatus handleSwitchChange={handleSwitchChange} />
          {isOpened ? (
            <Text>{t("Waiting For Requests...")}</Text>
          ) : (
            <Text>{t("Not Available For Request")}</Text>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "50%",
  },
  consumersList: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
  listContentContainer: {
    paddingBottom: 16,
  },
});

export default ProviderHomeScreen;
