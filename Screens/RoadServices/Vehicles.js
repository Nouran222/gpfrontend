import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import CustomButton from "../../components/CustomButton"
import ProviderHomeScreen from '../ProviderScreens/ProviderHomeScreen';
const Vehicles = ({navigation}) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.HeaderText}>Vehicles</Text>
            {/* <Text style={styles.Text}> Please Select Vehicle</Text> */}
            <View style={styles.VehicleContainer}>
                <View style={styles.VehicleRow}> 
                    <Text style={styles.Text}>1234-ABC purple</Text>
                    <Text style={styles.Text}>Toyota</Text>
                    <Text style={styles.Text}>Corolla</Text>
                </View>
                <View style={styles.VehicleRow}> 
                    <Image style={styles.carImage} source={require("../../assets/images/car.jpeg")} />
                    <View style={styles.buttonContainer}>
                        <CustomButton title={"Select"} onPressHandler={() => {navigation.navigate("ProviderHomeScreen") }} />
                    </View>
                </View>
            </View>
            <View style={styles.addButton} onPress={() => {}}>
            <CustomButton  title={"+"} onPressHandler={() => {}} fontSize={24} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 2,
        backgroundColor: "rgb(251, 245, 247)"
    },
    HeaderText: {
        margin: 5,
        fontSize: 20,
        fontFamily: 'Oswald',
        color: "black"
    },
    Text: {
        margin: 2
    },
    VehicleContainer: {
        height: 120,
        width: "95%",
        padding: 15,
        backgroundColor: "white",
        margin: 5,
        borderWidth: 1,
        borderColor: '#4D99CC',
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
        resizeMode: "contain"
    },
    buttonContainer: {
        width: 80,
        height: 60,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        // backgroundColor: '#4D99CC',
        width: 60,
        height: 60,
        borderRadius: 70,
    
    },
    
});

export default Vehicles;
