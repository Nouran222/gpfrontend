import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ConsumerCard from "../../components/ProviderComponents/ConsumerCard";

const ProviderHomeScreen = ({service}) => {
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

  useEffect(() => {
    userLocation();
  }, []);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker coordinate={origin} title="Hassan's Home" />
        <Marker coordinate={destination} title="yasmeen's Home" />

      </MapView>
      <View style={styles.consumersList}>
        <FlatList
          data={consumers}
          renderItem={({ item }) => (
            <ConsumerCard
              name={item.name}
              distance={item.distance}
              carType={item.carType}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "50%",
  },
  consumersList: {
    flex: 1,
    width: "100%",
    marginTop:10,
  },
  listContentContainer: {
    paddingBottom: 16,
  },
});

export default ProviderHomeScreen;
