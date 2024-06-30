import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

const HistoryCard = ({
  providerName,
  serviceName,
  servicePrice
}) => {
  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text variant="titleLarge" style={styles.title}>
              Provider Name: {providerName}
              </Text>
              <Text variant="bodyMedium" style={styles.subtitle}>
              Service Name: {serviceName}
              </Text>
              <Text variant="bodyMedium" style={styles.carType}>
              Service Price: {servicePrice}$
              </Text>
            </View>
          </View>
        </Card.Content>
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

export default HistoryCard;
