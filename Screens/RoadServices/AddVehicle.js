import React from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"; 
import CustomButton from '@/components/CustomButton';
import i18n from "../../app/(tabs)/i18n";
import { useTranslation } from 'react-i18next';

const AddVehicle = () => {
    const {t}=useTranslation()
    return (
        <View style={styles.container}>
            <View style={styles.homeHeader}>
                <Text style={styles.textHeader}>{t("Add Vehicle")}</Text>
            </View>
            <View style={styles.imageHeaderContainer}>
                <Image
                    style={styles.imageHeader}
                    source={require("../../assets/images/carr.jpg")}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={[styles.inputWrapper, { marginTop: 70 }]}>
                    <Icon name="car" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder={t("car make")}
                        placeholderTextColor="#666"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon name="info" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder={t("car model")}
                        placeholderTextColor="#666"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon name="calendar" size={20} color="#666" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder={t("year")}
                        placeholderTextColor="#666"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton title={t("Add")} onPressHandler={() => {}}></CustomButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
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
        color: "white",
        fontFamily:"Oswald"
    },
    imageHeaderContainer: {
        width: "100%",
        alignItems: "center",
        zIndex: 1,
        position: "relative",
        top: 10,
        borderRadius: 90,

    },
    imageHeader: {
        width: 180,
        height: 180,
        borderRadius: 90,
        resizeMode: "contain",
    },
    inputContainer: {
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 15,
        elevation: 4,
        backgroundColor: "rgb(251, 245, 247)",
        marginTop: -60,
        zIndex: 0,
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
})

export default AddVehicle;
