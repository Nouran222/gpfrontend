import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import ConsumerCard from "../../components/ProviderComponents/ConsumerCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ConsumersContext } from "@/Context/Consumer";
import { ServicePrice } from "../../constants/ServicePrice";
import i18n from "../../app/(tabs)/i18n";
import { useTranslation } from "react-i18next";
import CustomButton from "@/components/CustomButton";
import { Text } from "react-native";
import { IconButton } from "react-native-paper";

const ProviderHomeScreen2 = ({ navigation, route }) => {
  const { t } = useTranslation();
  const {
    currentVehicle,
    setCurrentVehicle,
    setTargetLocation,
    targetLocation,
  } = useContext(ConsumersContext);
  const { serviceType, setServiceType } = useContext(ConsumersContext);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&countrycodes=eg&bounded=1&viewbox=24.7,31.917,36.9,22.0`
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setMapRegion({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Text style={styles.text}>Search Target Location</Text>

        {/* <Image
          style={styles.profilePicture}
          source={require("../../assets/images/person.jpg")}
        /> */}
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t("Search location...")}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#587FA7" />
        </TouchableOpacity>
      </View>

      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Selected Location" />
      </MapView>

      {/* <View style={styles.consumersList}>
        <FlatList
          data={consumers}
          renderItem={({ item }) => {
            let price = 0;
            serviceType.forEach((element) => {
              price += item.distance * ServicePrice[element];
            });
            {
              console.log(price);
            }
            return (
              <ConsumerCard
                name={item.name}
                distance={item.distance}
                carType={item.carType}
                navigation={navigation}
                price={price}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      </View> */}

      {/* <Text>Location : {searchQuery}</Text>
      <Text>
        Lat & long : {mapRegion.latitude}& {mapRegion.longitude}
      </Text> */}

      <CustomButton
        title={"Confirm"}
        onPressHandler={() => {
          console.log("clk confirm");
          setTargetLocation({
            targetLocationName: searchQuery,
            targetLocationLat: mapRegion.latitude,
            targetLocationLong: mapRegion.longitude,
          });
          navigation.navigate("RequestScreen");
        }}
      ></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 20,
    fontFamily: "Oswald",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // padding: 15,
  },
  map: {
    width: "100%",
    height: "50%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  consumersList: {
    flex: 1,
    width: "100%",
  },
  listContentContainer: {
    paddingVertical: 16,
  },
  searchIcon: {
    padding: 10,
  },
});

export default ProviderHomeScreen2;
