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

const ProviderHomeScreen = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [consumers, setConsumers] = useState([
    { id: "1", name: "Consumer 1", distance: "2 km", carType: "Sedan" },
    { id: "2", name: "Consumer 2", distance: "5 km", carType: "SUV" },
    { id: "3", name: "Consumer 2", distance: "5 km", carType: "Sedan" },
    { id: "4", name: "Consumer 2", distance: "5 km", carType: "SUV" },
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
        <RequestScreen></RequestScreen>
      ) : (
        <View style={styles.mapContainer}>
          <SwitchStatus handleSwitchChange={handleSwitchChange} />
          {isOpened ? (
            <Text>Waiting For Requests...</Text>
          ) : (
            <Text>Not Available For Request</Text>
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
    width: 400,
    height: 500,
    flex: 1,
  },
  consumersList: {
    flex: 1,
  },
});

export default ProviderHomeScreen;
