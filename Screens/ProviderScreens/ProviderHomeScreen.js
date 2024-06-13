import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ConsumerCard from "../../components/ProviderComponents/ConsumerCard";

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

  useEffect(() => {
    userLocation();
  }, []);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      //   console.log("loc is" + location.coords.latitude);

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
      <MapView
        style={styles.map}
        region={mapRegion}
        // initialRegion={mapRegion}
      >
        <Marker coordinate={mapRegion} title="Hassan's Home"></Marker>
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
        />
      </View>
      {/* <Button title="Get Location" onPress={userLocation}/> */}
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
    width: 400,
    height: 500,
    flex: 1,
  },
  consumersList: {
    flex: 1,
  },
});

export default ProviderHomeScreen;
