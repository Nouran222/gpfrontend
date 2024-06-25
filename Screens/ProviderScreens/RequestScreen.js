import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { url } from "./../../constants/urls";
import { ConsumersContext } from "@/Context/Consumer";

const RequestScreen = ({ navigation, servicePrice }) => {
  const { currentVehicle, setCurrentVehicle } = useContext(ConsumersContext);
  // let car = route.params;
  // console.log(route.params);
  // car.servicePrice = 50;

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  let [socket, setSocket] = useState(null);
  let [id, setId] = useState(null);
  let [type, setType] = useState("consumer");
  let [providers, setProviders] = useState([]);
  let [providersData, setProvidersData] = useState([]);
  let [acceptedProviderId, setAcceptedProviderId] = useState();
  let [isRequestAccepted, setIsRequestAccepted] = useState(false);
  let [providersLiveLocation, setProvidersLiveLocation] = useState(null);
  let [hasArrived, setHasArrived] = useState(false);
  let mapRef = useRef(null);

  console.log("provData", providersData);

  // const [consumers, setConsumers] = useState([
  //   { id: "1", name: "Consumer 1", distance: "2 km", carType: "Sedan" },
  //   { id: "2", name: "Consumer 2", distance: "5 km", carType: "SUV" },
  //   { id: "3", name: "Consumer 2", distance: "5 km", carType: "Sedan" },
  //   { id: "4", name: "Consumer 2", distance: "5 km", carType: "SUV" },
  // ]);

  const sendRequest = (conId, conLoc, proId) => {
    socket.emit("SentRequest", {
      userId: conId,
      targetId: proId,
      location: conLoc,
      distance: 5.151,
    });
  };

  let getProviders = () => {
    if (id && socket) {
      console.log("click");
      socket.emit("GetNearBy", { userId: id });
    } else {
      console.log(socket);
      console.log(id);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("userId").then((data) => {
      setId(data);
    });

    let newsocket = io(url);
    setSocket(newsocket);

    userLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        socket.on("connect", () => {
          console.log("Connected to server");
          socket.emit("connected", { id, type });
        });

        socket.on("SentAvailable", (data) => {
          console.log("sent ", data);
          setProviders(data);
        });

        socket.on("notification", (data) => {
          console.log(data);
          if (data.arrivalMessage) {
            setHasArrived(true);
          }
        });

        socket.on("RequestAccepted", ({ providerId }) => {
          setAcceptedProviderId(providerId);
          setIsRequestAccepted(true);
          console.log("data", providersData);

          setProviders((old) => {
            return old.filter((p) => {
              console.log("old");
              return p["providerId"] === providerId;
            });
          });

          // providersData.map((p) => {
          //   console.log(p);
          // })
          // setProvidersData((old) => {

          // })
        });

        socket.on("Tracking", (data) => {
          setProvidersLiveLocation(data);
        });

        socket.on("ServiceEnded", (date) => {
          console.log("payment process");
          navigation.navigate("Payment", { servicePrice: 50 });
        });

        socket.on("disconnect", () => {
          console.log("socket disconnected");
        });

        // setSocket(newsocket);
      }

      return () => {
        console.log("cleanup");
        // console.log(socket);
        // console.log(id);
        // console.log(type);
        setProviders([]);

        if (socket && id && type) {
          socket.emit("disconnected", { id, type });
          socket.disconnect();
          setSocket(null);
        }
      };
    }, [id])
  );

  useEffect(() => {
    if (providersLiveLocation) {
      // console.log("asda");
      console.log(providersLiveLocation);
      let loc = providersLiveLocation["trackingMessage"];
      console.log("lat ", loc["latitude"]);
      console.log("long ", loc["longitude"]);

      mapRef.current.animateToRegion(
        {
          latitude: loc["latitude"],
          longitude: loc["longitude"],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  }, [providersLiveLocation]);

  useEffect(() => {
    if (providers.length > 0) {
      let ids = [];
      providers.forEach((p) => {
        ids.push(p["providerId"]);
      });

      axios
        .post(url + "/api/serviceProvider/providers", ids)
        .then((data) => {
          setProvidersData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [providers]);

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
    <>
      {!isRequestAccepted ? (
        <Button
          title="Get Nearby Providers"
          onPress={getProviders}
          buttonStyle={styles.button}
        />
      ) : null}

      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={mapRegion} ref={mapRef}>
          <Marker coordinate={mapRegion} title="You"></Marker>

          {providersLiveLocation ? (
            <Marker
              coordinate={{
                latitude: providersLiveLocation["trackingMessage"]["latitude"],
                longitude:
                  providersLiveLocation["trackingMessage"]["longitude"],
              }}
              title="You"
            ></Marker>
          ) : null}

          {providers?.map((p) => {
            let location = p["location"];
            let latitude = location["latitude"];
            let longitude = location["longitude"];
            let coordinate = { latitude, longitude };
            return (
              <Marker
                key={p["providerId"]}
                coordinate={coordinate}
                title="Origin"
              >
                <View style={[styles.customMarker, styles.originMarker]}></View>
              </Marker>
            );
          })}
        </MapView>

        <View style={styles.consumersList}>
          {!isRequestAccepted ? (
            <FlatList
              data={providersData["providersArray"]}
              renderItem={({ item }) => {
                return (
                  <ConsumerCard
                    sendRequest={sendRequest}
                    consumerId={id}
                    consumerLocation={mapRegion}
                    name={item["name"]}
                    providerId={item["_id"]}
                    // distance={item.distance}
                    carType={
                      item["owned_car"]["make"] +
                      " " +
                      item["owned_car"]["model"]
                    }
                    navigation={navigation}
                    // servicePrice={50}
                    servicePrice={servicePrice}
                  />
                );
              }}
              keyExtractor={(item) => item["_id"]}
              contentContainerStyle={styles.listContentContainer}
            />
          ) : (
            providersData["providersArray"].map((m) => {
              if (providers[0]) {
                if (m["_id"] === providers[0]["providerId"]) {
                  return !hasArrived ? (
                    <Text>{m["name"]} Is On The Way!!</Text>
                  ) : (
                    <Text>{m["name"]} has Arrived!!</Text>
                  );
                }
              }
            })
          )}
        </View>
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
    borderColor: "#fff",
    borderWidth: 2,
  },
  originMarker: {
    backgroundColor: "blue",
  },
});

export default RequestScreen;
