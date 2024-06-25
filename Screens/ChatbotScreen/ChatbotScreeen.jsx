import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const ChatbotScreen = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chatbot</title>
     
    </head>
    <body>
  <iframe
      width="100%"
      height="750"
      src="https://console.dialogflow.com/api-client/demo/embedded/3caf561e-19b3-4841-81ce-06b99f5fe0fc"
    ></iframe>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Text style={styles.textHeader}>Chatbot Services</Text>
      </View>
      <WebView source={{ html: htmlContent }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
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
    fontFamily: "Oswald",
    color: "white",
  },
});

export default ChatbotScreen;
