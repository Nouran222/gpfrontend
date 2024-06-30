import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import axios from "axios";
import RatingBottomModal from "../../components/modal";
import { ConsumersContext } from "@/Context/Consumer";
import { useTranslation } from "react-i18next";

const Payment = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const { paymentMethod, setPaymentMethod, providerId, serviceType, price } =
    useContext(ConsumersContext);
  // const servicePrice = route.params ? route.params : {};
  // useEffect(() => {
  //   const handleUrl = (event) => {
  //     const { url } = event;
  //     if (url) {
  //       const { path } = Linking.parse(url);
  //       if (path === "Home") {
  //         navigation.navigate("Home");
  //       } else if (path === "Payment") {
  //         navigation.navigate("Payment");
  //       }
  //     }
  //   };

  //   Linking.addEventListener("url", handleUrl);

  //   Linking.getInitialURL().then((url) => {
  //     if (url) {
  //       handleUrl({ url });
  //     }
  //   });

  //   return () => {
  //     Linking.removeEventListener("url", handleUrl);
  //   };
  // }, []);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const buyBook = async () => {
    const dataDetail = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      transactions: [
        {
          amount: {
            currency: "AUD",
            total: 50 + "",
            // details: {
            //   shipping: '6',
            //   subtotal: '20',
            //   shipping_discount: '0',
            //   insurance: '0',
            //   handling_fee: '0',
            //   tax: '0',
            // },
          },
          description: "This is the payment transaction description",
          payment_options: {
            allowed_payment_method: "IMMEDIATE_PAY",
          },
          // item_list: {
          //   items: [
          //     {
          //       name: 'Book',
          //       description: 'Chasing After The Wind',
          //       quantity: '1',
          //       price: '20',
          //       tax: '0',
          //       sku: 'product34',
          //       currency: 'AUD',
          //     },
          //   ],
          // },
        },
      ],
      redirect_urls: {
        return_url: "myapp://Home",
        cancel_url: "myapp://Payment",
      },
    };

    const tokenUrl = "https://api.sandbox.paypal.com/v1/oauth2/token";

    const tokenData = {
      grant_type: "client_credentials",
    };

    const auth = {
      username:
        "AdO-NE8K2IY9chzjwYnXu-gzWuzwcu2a6jkozf6mtl1dLi-hkC2B7rZlzcbD5Sj_RfC3c5g-5n_NNh6p",
      password:
        "EOtlR1WUDKZhH8RdLGLurIY3Ob0UOFC9xYHVvq3fetnUAQpn1ddRnwfYvbTvzfxerPlO72UR7TqqOENl",
    };

    const tokenOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Credentials": true,
      },
      data: Object.keys(tokenData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(tokenData[key])
        )
        .join("&"),
      auth: auth,
      url: tokenUrl,
    };

    try {
      const tokenResponse = await axios(tokenOptions);
      console.log("Token response:", tokenResponse.data);

      const accessToken = tokenResponse.data.access_token;
      if (!accessToken) {
        throw new Error("Failed to obtain access token");
      }

      setAccessToken(accessToken);

      const paymentUrl = "https://api.sandbox.paypal.com/v1/payments/payment";

      const paymentOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const paymentResponse = await axios.post(
        paymentUrl,
        dataDetail,
        paymentOptions
      );
      console.log("Payment response:", paymentResponse.data);

      const { id, links } = paymentResponse.data;
      const approvalUrl = links.find(
        (data) => data.rel === "approval_url"
      ).href;

      console.log("Approval URL:", approvalUrl);
      setPaypalUrl(approvalUrl);
      return approvalUrl;
    } catch (error) {
      console.error(
        "PayPal payment error:",
        error.response ? error.response.data : error.message
      );
      setError("An error occurred during the payment process");
      return null;
    }
  };

  const handlePayPalPayment = async () => {
    try {
      const approvalUrl = await buyBook();

      if (approvalUrl) {
        console.log("Opening PayPal URL:", approvalUrl);
        const supported = await Linking.canOpenURL(approvalUrl);
        if (supported) {
          await Linking.openURL(approvalUrl);
          setPaidFor(true);
          setPaymentMethod("paypal");
          console.log(paymentMethod);
        } else {
          Alert.alert("Can't handle URL: " + approvalUrl);
        }
      } else {
        setError("Failed to initiate PayPal payment");
      }
    } catch (error) {
      console.error("PayPal payment error:", error);
      setError("An error occurred during the payment process");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Text style={styles.textHeader}>{t("Payment")}</Text>
      </View>
      <View style={styles.imageHeaderContainer}>
        <Image
          style={styles.imageHeader}
          source={require("../../assets/images/R.png")}
        />
      </View>
      <View style={styles.selectionsContainer}>
        <View
          style={{
            marginTop: 70,
            backgroundColor: "#FFF394",
            padding: 15,
            width: "50%",
            marginHorizontal: "auto",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              color: "#3D3B3B",
              fontWeight: "bold",
            }}
          >
            {" "}
            {price ? `${price} LE` : "00.00 LE"}{" "}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.paymentContainer,
            { backgroundColor: "mistyrose", elevation: 5, marginTop: 30 },
          ]}
          onPress={() => {
            setIsModalVisible(true);
            setPaymentMethod("cash");
            console.log(paymentMethod);
          }}
        >
          <View style={styles.row}>
            <Image
              style={styles.methodImage}
              source={require("../../assets/images/cash.jpg")}
            />
            <Text style={styles.paymentText}>{t("Cash on delivery")}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentContainer,
            { backgroundColor: "silver", elevation: 5 },
          ]}
          onPress={handlePayPalPayment}
        >
          <View style={styles.row}>
            <Image
              style={styles.methodImage}
              source={require("../../assets/images/paypal.jpg")}
            />
            <Text style={styles.paymentText}>{t("Pay with PayPal")}</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* {console.log("ser type in payment ", serviceType)} */}
      <RatingBottomModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onRatingChanged={handleRatingChange}
        starSize={40} // Adjust the star size as needed
        maxStars={5} // Adjust the maximum number of stars as needed
        starRating={rating} // Initial rating value
        providerId={providerId}
        navigation={navigation}
        serviceType={serviceType}
      />
    </View>
  );
};

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
    fontSize: 25,
    color: "white",
    fontFamily: "Oswald",
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
  selectionsContainer: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 15,
    elevation: 4,
    backgroundColor: "rgb(251, 245, 247)",
    marginTop: -60,
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
