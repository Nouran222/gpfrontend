import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Image, TextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Example icon library
import CustomButton from "@/components/CustomButton";
import { useTranslation } from "react-i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { url } from "@/constants/urls";
import { useFocusEffect } from "@react-navigation/native";
const Profile = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
      console.log(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .post(url + "/api/user/profile", { userId })
        .then((res) => {
          setUserInfo(res.data.userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  if (!userInfo) return <Text>Loading...</Text>;
  return (
    <View style={styles.profile}>
      <View style={styles.header}>{/* Header content */}</View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.img}
          source={require("../../assets/images/avatar.png")}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="user" size={20} color="#666" style={styles.icon} />

          <TextInput
            editable={false}
            style={styles.input}
            placeholder={userInfo.name}
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="envelope" size={20} color="#666" style={styles.icon} />
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={userInfo.email}
            placeholderTextColor="#666"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="phone" size={20} color="#666" style={styles.icon} />
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={"" + userInfo.contact_number}
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={t("Save")}
            onPressHandler={() => {}}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    // flex: 1,
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#9AB3CA",
    height: 200,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    overflow: "hidden",
    position: "relative",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  imageContainer: {
    position: "absolute",
    top: 130,
    width: "100%",
    alignItems: "center",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
  },
  inputContainer: {
    // flex: 1,
    // justifyContent:"space-around",
    marginVertical: 80,
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: "#666",
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },
});

export default Profile;
