import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const ConsumerCard = ({ name, distance, carType }) => (
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
            {carType}
          </Text>
        </View>
      </View>
    </Card.Content>
    <Card.Actions style={styles.actions}>
      <Button
        style={styles.button}
        onPress={() => {
          console.log("Accepted");
        }}
      >
        Select
      </Button>
    </Card.Actions>
  </Card>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    width: '100%',
    padding: 8,
  },
  card: {
    borderRadius: 8,
    elevation: 4,
    // height:150
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    marginRight: 16,
    // backgroundColor:'lightskyblue',
    // backgroundColor:'lightblue',
    backgroundColor:'dodgerblue',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
    fontFamily:'Oswald',
    fontSize:18,
  },
  subtitle: {
    color: "#6e6e6e",
  },
  carType: {
    marginTop: 4,
    fontFamily:'Oswald',
  },
  actions: {
    justifyContent: "flex-end",
    padding: 8,
  },
  button: {
    marginHorizontal: 4,
  },
});

export default ConsumerCard;
