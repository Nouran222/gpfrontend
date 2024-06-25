import React from 'react';
import { StyleSheet, View, Text,Image ,TextInput} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"; // Example icon library

const AddVehicle = () => {
    return (
        <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Text style={styles.textHeader}>Add Vehicle</Text>
      </View>
      <View style={styles.imageHeaderContainer}>
        <Image
          style={styles.imageHeader}
          source={require("../../assets/images/R.png")}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.inputWrapper,{marginTop: 70}]}>
          <Icon name="user" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="car make"
            placeholderTextColor="#666"
            
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="model" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="info@aplusdesign.co"
            placeholderTextColor="#666"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="year" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="818 123 4567"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
          />
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
      },
      imageHeaderContainer: {
        width: "100%",
        alignItems: "center",
        zIndex: 1,
        position: "relative",
        top: 0,
      },
      imageHeader: {
        width: 300,
        height: 180,
        resizeMode: "contain",
      },
      inputContainer: {
        // flex: 1,
        // justifyContent:"space-around",
        // marginVertical: 80,
        // paddingHorizontal: 20,
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
})

export default AddVehicle;
