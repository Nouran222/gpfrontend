import { useContext } from "react";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import CustomButton from "../CustomButton";
import { ConsumersContext } from "@/Context/Consumer";
const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;


const ConsumerCard = ({
  name,
  distance,
  carType,
  navigation,
  sendRequest,
  consumerId,
  consumerLocation,
  providerId,
  price,
}) => {
  let [isClicked, setIsClicked] = React.useState(false);
  const {setPrice}=useContext(ConsumersContext)
  const {currentVehicle,setcurrentVehicle}=useContext(ConsumersContext)
  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <Avatar.Icon icon="account" size={48} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text variant="titleLarge" style={styles.title}>
                {name}
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
                {distance}
              </Text>
              <Text variant="bodyMedium" style={styles.carType}>
                {/* {carType} */}
                {currentVehicle["make"]+" "+currentVehicle["model"]}

              </Text>
              <Text variant="bodyMedium" style={styles.carType}>
                {price} LE

              </Text>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          {/* <Button
        style={styles.button}
        onPress={() => {
          console.log("Accepted");
        }}
      >
        Select
      </Button> */}
          <View style={styles.button}>
            <CustomButton
              title={"Send Request"}
              onPressHandler={() => {
                !isClicked
                  ? (sendRequest(consumerId, consumerLocation, providerId),
                    setIsClicked(true))
                  : null;
                  setPrice(price)
                    // navigation.navigate('Payment' );
                // console.log(servicePrice);
                // navigation.navigate('Payment');
              }}
            ></CustomButton>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: "100%",
    padding: 8,
  },
  card: {
    borderRadius: 8,
    elevation: 4,
    // height: 160,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
  },
  avatar: {
    marginRight: 16,
    // backgroundColor:'lightskyblue',
    backgroundColor: "#587FA7",
    // backgroundColor:'dodgerblue',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 1,
    // fontFamily: 'Oswald',
    fontSize: 18,
  },
  subtitle: {
    color: "#6e6e6e",
  },
  carType: {
    marginTop: 2,
    // fontFamily: 'Oswald',
  },
  actions: {
    // justifyContent: "flex-end",
    padding: 2,
  },
  button: {
    marginHorizontal: 4,
    width: "50%",
  },
});

export default ConsumerCard;
