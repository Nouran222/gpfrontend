import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Payment = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.headerWrapper}>
        <ImageBackground
          source={require("../../assets/images/paymentimage.jpg")}
          style={styles.header}
        >
          <Text style={styles.textHeader}>Payment</Text>
        </ImageBackground>
      </View> */}
<View style={styles.homeHeader}>
                <Text style={styles.textHeader}>Payment</Text>
            </View>
      <View style={styles.imageHeaderContainer}>
        <Image
          style={styles.imageHeader}
          source={require("../../assets/images/R.png")}
        />
      </View>
     
      <View style={styles.selectionsContainer}>
        <TouchableOpacity
          style={[
            styles.paymentContainer,
            { backgroundColor: "mistyrose", elevation: 5 ,marginTop: 70,},
          ]}
          onPress={() => {}}
        >
          <View style={styles.row}>
            <Image
              style={styles.methodImage}
              source={require("../../assets/images/cash.jpg")}
            />
            <Text style={styles.paymentText}>Cash on delivery</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentContainer,
            { backgroundColor: "silver", elevation: 5 },
          ]}
          onPress={() => {}}
        >
          <View style={styles.row}>
            <Image
              style={styles.methodImage}
              source={require("../../assets/images/paypal.jpg")}
            />
            <Text style={styles.paymentText}>Pay with PayPal</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
//   headerWrapper: {
//     width: "100%",
//     height: 100,
//     overflow: "hidden",
//     borderBottomRightRadius: 60,
//   },
  header: {
    flex: 1,
  },
//   textHeader: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
homeHeader: {
    height: 90,
    width: '100%',
    flexDirection: "row",
    backgroundColor: "#9AB3CA",
    borderBottomRightRadius: 45,
    justifyContent: "space-between",
    alignItems: 'center',
    overflow: 'hidden',
},
textHeader: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'Oswald',
    color: "white"
},
  imageHeaderContainer: {
    width: "100%",
    alignItems: "center",
    zIndex: 1,
    position: "relative",
    top: 0, // Adjust as needed to position the image correctly
  },
  imageHeader: {
    width: 300,
    height: 180,
    resizeMode: "contain",
  },
  selectionsContainer: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 15,
    elevation:4,
    backgroundColor: "rgb(251, 245, 247)",
    marginTop: -60, // Adjust to overlap with the image
    zIndex: 0,
  },
  paymentContainer: {
    height: 120,
    width: "95%",
    padding: 15,
    margin: 15,
    
    marginHorizontal: "auto",
    borderRadius: 30,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  methodImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    borderRadius: 25,
  },
  paymentText: {
    marginLeft: 15,
    fontWeight: "500",
    fontSize: 20,
  },
});

export default Payment;
