import React, { useContext, useEffect, useState } from "react";
// import { BlurView } from "@react-native-community/blur";
// import { Platform } from 'react-native';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
  Text,
  Button,
  serviceType,
} from "react-native";
import Star from "./Star";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "@/constants/urls";
import CustomButton from "./CustomButton";
import { Snackbar, TextInput } from "react-native-paper";
import { ConsumersContext } from "@/Context/Consumer";

// import Stars from './Stars';

const { width, height } = Dimensions.get("screen");

const MODAL_HEIGHT = height * 0.3;

export const RatingBottomModal = ({
  visible,
  onClose,
  onRatingChanged,
  starSize,
  maxStars = 5,
  starRating = 0,
  providerId,
  navigation,
  serviceType,
}) => {
  if (!visible) {
    return null;
  }
  // console.log("proooId", providerId);
  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: height })).current;
  const [offset, setOffset] = React.useState(starRating || 0);
  const [provider, setProvider] = React.useState(null);
  const animatedWidth = React.useRef(0);
  const [inputValue, setInputValue] = useState("");
  const { consumerName, price } = useContext(ConsumersContext);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const onDismissSnackBar = () => {
    setInterval(() => {
      setSnackbarVisible(false);
    }, 2000);
  };

  // let id = null;
  // useEffect(()=>{
  //   let getId = async ()=>{
  //     // id = await AsyncStorage.getItem('userId')
  //     // i want provider id
  //     console.log(id);
  //   }
  //   getId()
  // },[])
  const openAnim = () => {
    Animated.spring(pan.y, {
      toValue: height * 0.6 - MODAL_HEIGHT,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeAnim = () => {
    Animated.spring(pan.y, {
      toValue: height,
      useNativeDriver: true,
    }).start();

    // you may invoke it in the animation end callback, but
    // that may feel slower
    onClose();
  };

  React.useEffect(() => {
    onRatingChanged(offset);

    axios
      .post(url + "/api/serviceProvider/updateRating", {
        providerId,
        rating: offset,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    openAnim();
  }, [visible]);

  React.useEffect(() => {
    axios
      .get(`${url}/api/serviceProvider/${providerId}`)
      .then((res) => {
        setProvider(res.data["sProvider"]["name"]);
        console.log("res.data = ", res.data["sProvider"]["name"]);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleComplaint = () => {
    const now = new Date();
    let ser_type;
    if (serviceType.length == 1 && serviceType[0] === "winch") {
      ser_type = "pickup";
    } else {
      ser_type = "repair";
    }
    let data = {
      providerId: providerId,
      complaint: {
        consumerName: consumerName,
        service_type: ser_type,
        date: now.toLocaleDateString(),
        content: inputValue,
      },
    };
    axios
      .post(`${url}/api/serviceProvider/complaint`, data)
      .then((res) => {
        console.log(res.data);
        setInputValue("");
        setSnackbarVisible(true);
      })
      .catch((e) => {
        console.log(e);
      });

    // console.log(data);
  };

  const changeOffset = React.useCallback((e) => {
    const { nativeEvent } = e;

    const distance = (width - animatedWidth.current) / 2;
    const starSize = animatedWidth.current / (maxStars || 5);

    let v = Number((nativeEvent.pageX - distance) / starSize);

    const rest = v - Math.trunc(v);

    if (rest <= 0.5) {
      v = Math.trunc(v);
    } else {
      v = Math.trunc(v) + 0.5;
    }

    setOffset(v);
  }, []);

  const handleRate = async () => {
    console.log("handle");
    let consumerId = await AsyncStorage.getItem("userId");

    // if(consumerId)

    if (serviceType.length === 1 && serviceType[0] === "winch") {
      axios.post(`${url}/api/user/history/${consumerId}`, {
        providerId: providerId,
        serviceName: "pickup",
        servicePrice: price,
      });
      axios.post(`${url}/api/analysis`, {
        providerId,
        serviceName: "pick up",
        providerName: provider,
      });
    } else {
      axios.post(`${url}/api/user/history/${consumerId}`, {
        providerId: providerId,
        serviceName: "repair",
        servicePrice: price,
      });
      axios.post(`${url}/api/analysis`, {
        providerId,
        serviceName: "repair",
        providerName: provider,
      });
    }

    navigation.navigate("Home");

    //tires,fuel,battery >> repair
    //data > providerId , providerName,serviceName
    // console.log("ser Typeee", serviceType);
  };
  const changeModalPosition = React.useCallback((gs) => {
    const value = height - MODAL_HEIGHT + gs.dy;

    // prevent dragging too high or too low
    if (value >= height || value < height - MODAL_HEIGHT) {
      return;
    }

    pan.y.setValue(value);
  }, []);

  const modalResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e) => {
        // check if touch is in the modal area
        if (e.nativeEvent.pageY > height - MODAL_HEIGHT) {
          return true;
        }

        closeAnim();

        return false;
      },
      onPanResponderGrant: () => {
        // TODO: show some visual feedback here
      },
      onPanResponderMove: (_, gs) => {
        changeModalPosition(gs);
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < MODAL_HEIGHT / 2) {
          openAnim();
        } else {
          closeAnim();
        }
      },
    })
  ).current;

  const starPanResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => {
        changeOffset(e);
        return true;
      },
      onPanResponderMove: (e, gs) => {
        // user swiped down on a star
        if (gs.dy > 50) {
          changeModalPosition(gs);
          return;
        }

        changeOffset(e);
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < MODAL_HEIGHT / 2) {
          openAnim();
        } else {
          closeAnim();
        }
      },
    })
  ).current;
  // console.log("or", provider);
  return (
    <>
      <Animated.View
        {...modalResponder.panHandlers}
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            backgroundColor: "rgba(0,0,0,.1)",
          },
        ]}
      >
        {/* {Platform.OS === 'android'?(<BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />):<View><Text>MSH Gaya</Text></View> } */}
        {/* <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      /> */}
        <View>
          <Animated.View
            style={{
              opacity: pan.y.interpolate({
                inputRange: [height - MODAL_HEIGHT, height],
                outputRange: [1, 0.5],
              }),
              transform: [
                {
                  translateY: pan.y,
                },
              ],
            }}
          >
            <View
              style={{
                width: "100%",
                height: MODAL_HEIGHT,
                backgroundColor: "#fff",
                shadowColor: "#ccc",
                shadowOffset: { height: -1, width: 0 },
                shadowRadius: 15,
                shadowOpacity: 0.1,
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingTop: 24,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {provider}
                </Text>

                <View
                  style={{
                    marginTop: 16,
                    flexDirection: "row",
                  }}
                >
                  <Animated.View
                    onLayout={(e) => {
                      animatedWidth.current = e.nativeEvent.layout.width;
                    }}
                    style={{ flexDirection: "row" }}
                    {...starPanResponder.panHandlers}
                  >
                    {Array.from({ length: maxStars || 5 }).map((_, i) => {
                      return (
                        <Star
                          key={i}
                          size={starSize}
                          distance={8}
                          offset={offset - i}
                        />
                      );
                    })}
                  </Animated.View>
                </View>

                <View
                  style={{
                    marginTop: 16,
                    flexDirection: "row",
                  }}
                >
                  <Animated.View
                    onLayout={(e) => {
                      animatedWidth.current = e.nativeEvent.layout.width;
                    }}
                    style={{ flexDirection: "row" }}
                    {...starPanResponder.panHandlers}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Do you have any complaints? Write it here"
                      value={inputValue}
                      onChangeText={(text) => setInputValue(text)}
                      right={
                        <TextInput.Icon
                          onPress={handleComplaint}
                          icon="send"
                          size={30}
                          style={{ marginRight: 25, padding: 1 }}
                        />
                      }
                      theme={{
                        colors: {
                          primary: "red", // Customize the primary color
                          text: "#000", // Customize the text color
                          placeholder: "#aaa", // Customize the placeholder color
                          background: "#fff", // Customize the background color
                        },
                      }}
                    />
                  </Animated.View>
                </View>

                <CustomButton title="Go Back Home" onPressHandler={handleRate}>
                  {" "}
                </CustomButton>
              </View>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
      <Snackbar visible={snackbarVisible} onDismiss={onDismissSnackBar}>
        Complaint added Successfully.
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    fontSize: 15,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
export default RatingBottomModal;
