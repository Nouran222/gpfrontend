import React, { useEffect, useState  , useContext} from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton";
import ProviderHomeScreen from "../ProviderScreens/ProviderHomeScreen";
import ProviderHomeScreen2 from "../ProviderScreens/searchLocation";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { url } from "@/constants/urls";
import { ConsumersContext } from "@/Context/Consumer";
import AddVehicle from "./AddVehicle";

const Vehicles = ({ navigation }) => {
  let [userCars, setUserCars] = useState(null);
  let [id, setId] = useState(null);
const  { serviceType, setServiceType } = useContext(ConsumersContext);
const {currentVehicle, setCurrentVehicle}=useContext(ConsumersContext);
  useEffect(() => {
    AsyncStorage.getItem("userId").then((data) => {
      setId(data);
    });
  }, []);

  useEffect(() => {
    if (id) {
      // console.log(id);
      axios
        .get(`${url}/api/user/${id}`)
        .then((data) => {
          setUserCars(data.data["user"]["owned_cars"]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.textHeader}>Vehicles</Text>
      </View>
      {/* <Text style={styles.Text}> Please Select Vehicle</Text> */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {userCars?.map((u, i) => {
          return (
            <View key={i} style={styles.VehicleContainer}>
              <View style={styles.VehicleRow}>
                <Text style={styles.Text}>{u["make"].toUpperCase()}</Text>
                <Text style={styles.Text}>{u["model"].toUpperCase()}</Text>
                <Text style={styles.Text}>{u["year"]}</Text>
              </View>
              <View style={styles.VehicleRow}>
                <Image
                  style={styles.carImage}
                  source={require("../../assets/images/car.jpeg")}
                />
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={"Select"}
                    onPressHandler={() => {
                        // console.log(u);
                         setCurrentVehicle(u);
                        // console.log(currentVehicle);
                      if (serviceType[0] === "winch")
                        // console.log(serviceType);

                        navigation.navigate("ProviderHomeScreen2");
                      else
                      // console.log(serviceType);

                        navigation.navigate("RequestScreen");
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.addButton} onPress={() => {}}>
        <CustomButton title={"+"} onPressHandler={() => {navigation.navigate("AddVehicle")}} fontSize={24} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // margin: 2,
    backgroundColor: "rgb(251, 245, 247)",
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
    fontSize: 18,
    fontFamily: "Oswald",
    color: "white",
  },

  container: {
    flexGrow: 1,
    padding: 10,
  },

  // HeaderText: {
  //     margin: 5,
  //     fontSize: 20,
  //     fontFamily: 'Oswald',
  //     color: "black"
  // },
  Text: {
    margin: 2,
  },
  VehicleContainer: {
    height: 120,
    width: "95%",
    padding: 15,
    backgroundColor: "white",
    margin: 15,
    borderWidth: 1,
    borderColor: "#4D99CC",
    borderRadius: 30,
  },
  VehicleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 2,
  },
  carImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  buttonContainer: {
    width: 80,
    height: 60,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    // backgroundColor: '#4D99CC',
    width: 60,
    height: 60,
    borderRadius: 70,
  },
});

export default Vehicles;
