import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Callout, Marker, Overlay, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import ConsumerCard from "../../components/ProviderComponents/ConsumerCard";
import { ProgressBar } from "react-native-paper";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const RequestScreen = ({ navigation, route }) => {
  let car = route.params
  // console.log(route.params);

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  let [socket, setSocket] = useState(null);
  let [id, setId] = useState(null);
  let [type, setType] = useState('consumer');
  let [providers, setProviders] = useState([]);
  let [providersData, setProvidersData] = useState([]);

  console.log(providers);

  // const [consumers, setConsumers] = useState([
  //   { id: "1", name: "Consumer 1", distance: "2 km", carType: "Sedan" },
  //   { id: "2", name: "Consumer 2", distance: "5 km", carType: "SUV" },
  //   { id: "3", name: "Consumer 2", distance: "5 km", carType: "Sedan" },
  //   { id: "4", name: "Consumer 2", distance: "5 km", carType: "SUV" },
  // ]);

  let getProviders = () => {
    if (id && socket) {
      console.log("click");
      socket.emit("GetNearBy", { userId: id })

    } else {
      console.log(socket);
      console.log(id);
    }
  }

  useEffect(() => {
    AsyncStorage.getItem("userId").then((data) => {
      setId(data)
    })

    // AsyncStorage.getItem("userRole").then((data) => {
    //   setType(data)
    // })

    userLocation();

    return () => {
      if (socket && id && type) {
        socket.emit('disconnect', { id, type });
        socket.disconnect();
        setSocket(null);
      }
    }

  }, [])

  useEffect(() => {
    if (id && type) {
      // let newsocket = io("https://gp-backend-8p08.onrender.com");
      let newsocket = io("http://192.168.1.10:8000/");

      newsocket.on("connect", () => {
        console.log("Connected to server");
        newsocket.emit("connected", { id, type });
      });

      newsocket.on("SentAvailable", (data) => {
        console.log("Sent");
        setProviders(data);
      })

      newsocket.on("disconnect", () => {
        console.log('socket disconnected');
      })

      setSocket(newsocket);
    }
  }, [id, type]);

  useEffect(() => {
    if (providers.length > 0) {
      let ids = [];
      providers.forEach((p) => {
        ids.push(p["providerId"]);
      })

      axios.post("http://192.168.1.10:8000/api/serviceProvider/providers", ids)
        .then((data) => {
          setProvidersData(data.data);
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, [providers])

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


  // const origin = { latitude: 37.78825, longitude: -122.4324 };
  // const destination = { latitude: 37.79855, longitude: -122.4324 };
  // const region = {
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // };
  return (
    <>
      <Button
        title="Get Nearby Providers"
        onPress={getProviders}
        buttonStyle={styles.button}
      />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={mapRegion}
        // initialRegion={region}
        >
          <Marker coordinate={mapRegion} title="Hassan's Home"></Marker>

          {
            providers.map((p) => {
              let location = p["location"];
              let latitude = location["latitude"];
              let longitude = location["longitude"];
              let coordinate = { latitude, longitude }
              return (
                <Marker key={p["providerId"]} coordinate={coordinate} title="Origin" >
                  <View style={[styles.customMarker, styles.originMarker]}>

                  </View>
                </Marker>
              )
            })
          }

        </MapView>
        {/* <View style={styles.consumersList}>
          <ProgressBar progress={0.5} />
          <ConsumerCard name="Consumer 1" distance={"2 Km"} carType={"Sedan"} navigation={navigation} />
        </View> */}
        <View style={styles.consumersList}>

          <FlatList
            data={providersData["providersArray"]}
            renderItem={({ item }) => {
              return (
                <ConsumerCard
                  name={item["name"]}
                  // distance={item.distance}
                  carType={item["owned_car"]["make"] + " " + item["owned_car"]["model"]}
                  navigation={navigation}
                />
              )
            }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
        {/* <Button title="Get Location" onPress={userLocation}/> */}
      </View>
    </>
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
    width: "100%",
  },
  listContentContainer: {
    paddingVertical: 16,
  },
  customMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#fff',
    borderWidth: 2,
  },
  originMarker: {
    backgroundColor: 'blue',
  },

});

export default RequestScreen;
