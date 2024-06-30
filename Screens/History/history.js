import { url } from "@/constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import HistoryCard from "@/components/historyCard";
import { IconButton } from "react-native-paper";
import i18n from "@/app/(tabs)/i18n";

const History = ({navigation}) => {
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem("userId");
      if (id) setUserId(id);
    })();
  }, []);

  useEffect(() => {
    if (userId)
      axios
        .post(`${url}/api/user/history`, { consumerId: userId })
        .then((res) => {
          setHistory(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  });
  return (
    <View>
      <View style={styles.homeHeader}>
        <Text style={styles.text}>History</Text>
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
      </View>
      <FlatList
        data={history}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <HistoryCard
            providerName={item.providerName}
            serviceName={item.serviceName}
            servicePrice={item.servicePrice}
          />
        )}
      />
    </View>
  );
};


export default History;
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
      fontSize: 20,
      fontFamily: "Oswald",
    }
    
  });
  