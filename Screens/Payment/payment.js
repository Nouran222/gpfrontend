import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Payment = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <ImageBackground 
                    source={require("../../assets/images/paymentimage.jpg")} 
                    style={styles.header}
                >
                    <Text style={styles.textHeader}>Payment</Text>
                </ImageBackground>
            </View>

            <TouchableOpacity
                style={[styles.paymentContainer, { backgroundColor: 'mistyrose',elevation:5}]}
                onPress={() => {}}
            >
                <View style={styles.row}>
                    <Image style={styles.methodImage} source={require("../../assets/images/cash.jpg")} />
                    <Text style={styles.paymentText}>Cash</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.paymentContainer, { backgroundColor: 'silver',elevation:5 }]}
                onPress={() => {}}
            >
                <View style={styles.row}>
                    <Image style={styles.methodImage} source={require("../../assets/images/paypal.jpg")} />
                    <Text style={styles.paymentText}>PayPal</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    headerWrapper: {
        width: '100%',
        height: 300,
        overflow: 'hidden',
        borderBottomRightRadius: 100,
    },
    header: {
        flex: 1,
        
    },
    textHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        
    },
    image: {
        width: '95%',
        height: 350,
        resizeMode: 'contain',
        margin: 'auto',
    },
    paymentContainer: {
        height: 120,
        width: "95%",
        padding: 15,
        margin: 15,
        borderRadius: 30,
        justifyContent: 'center',
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
    },
    methodImage: {
        width: 50,
        height: 50,
        resizeMode: "contain",
        borderRadius: 25,
    },
    paymentText: {
        marginLeft: 15,
        fontWeight: '500',
        fontSize: 20,
    },
});

export default Payment;
