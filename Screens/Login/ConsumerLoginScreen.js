import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, I18nManager, Image, StyleSheet, Text, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../../components/formInput.js";
import CustomButton from "@/components/CustomButton";
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Divider, Menu, Provider } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import i18n from "@/app/(tabs)/i18n.js";



const ConsumerLoginScreen = ({navigation}) => {

  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const formSchema = z.object({
    email: z.string().email(t("emailValidation")),
    password: z.string().min(8, t("passwordValidation")),
  });

  const { control, handleSubmit } =
    useForm(
      {
        defaultValues: {
          email: "",
          full_name: "",
          password: "",
        },
        resolver: zodResolver(formSchema),
      });

  const onSubmit = (data) => {
    // Alert.alert("Successful", JSON.stringify(data));
    if(data)
      {
        axios.post("http://192.168.1.8:8000/api/user/login",data)
        .then(async (res)=>{
        let foundUser = res.data
          await AsyncStorage.setItem('userId',foundUser._id)
          await AsyncStorage.setItem('userRole','consumer')
          // navigation.navigate('ProviderHomeScreen');
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    
  };


  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(i18n.language);

  const openMenu = () => setVisible(true);
  const closeMenu = () => {
    setVisible(false)
    
  };

  const handleMenuItemPress = (item) => {
    setSelectedItem(item);
    i18n.changeLanguage(item)
    closeMenu();
  };
  return (
    <Provider>

    <View style={styles.container}>
      <Menu
          style={{width:50,marginVertical:45,marginHorizontal:10}}
          visible={visible}
          onDismiss={closeMenu}
          anchor=
          {<Button
              mode="elevated"
              onPress={openMenu}
              icon="arrow-down-drop-circle"
              style={{width:45}}
              >{selectedItem}
            </Button>
            }
        >
          <Menu.Item onPress={() => handleMenuItemPress('en')} title="en"/>

          <Menu.Item onPress={() => handleMenuItemPress('ar')} title="ar"/>
          
        </Menu>
      <Text style={styles.heading}>{t("Login")}</Text>
      <Image style={styles.LoginImage} source={require("../../assets/images/loginimg.jpeg")}></Image>
      <FormInput
        control={control}
        name="email"
        placeholder={t("email")}
        style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
        />
      <FormInput
        control={control}
        name="password"
        placeholder={t("password")}
        secureTextEntry
        style={[styles.input, { textAlign: isRTL ? 'right' : 'left' }]}
        />
      <View style={styles.buttonContainer}>
        <CustomButton
          title={t("Login")}
          onPressHandler={handleSubmit(onSubmit)}
          
          />
      </View>
      <View style={styles.registerTxtContainer}>
        <Text style={styles.registerTxt}>
          {t("no_account")}?
          <TouchableOpacity onPress={() => navigation.navigate('userTypeScreen')}>
            <Text style={{ color: 'blue', marginHorizontal: 3 }}>{t("register_now")}</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
</Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "white",
  },
  heading: {
    // fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 24,
    // color: '#333',
    fontSize: 25,
    fontFamily: 'Oswald',
  },
  LoginImage:{
    width:250,
    height:200,
    resizeMode:"contain",
    marginBottom:2
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 16,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems:'center'
  },
  registerTxtContainer: {
    marginVertical: 15
  },
  registerTxt: {
    fontSize: 17,

  }
});

export default ConsumerLoginScreen;
