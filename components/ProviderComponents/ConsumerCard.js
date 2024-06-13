import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const ConsumerCard = ({ name, distance, carType }) => (
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
          console.log("Skipped");
        }}
      >
        Skip
      </Button>
      <Button
        style={styles.button}
        onPress={() => {
          console.log("Accepted");
        }}
      >
        Accept
      </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    margin: 20,
    borderRadius: 8,
    width: 380,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    color: "#6e6e6e",
  },
  carType: {
    marginTop: 8,
    fontWeight: "bold",
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
