import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const Home = () => {
  const Card = ({ title, color }) => {
    return (
      <TouchableOpacity style={[styles.card, { backgroundColor: color }]}>
        <Text style={styles.cardText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.text}>Hello, Yasmeen</Text>
        <Image style={styles.profilePicture} source={require("../../assets/images/person.jpg")} />
      </View>
      
      <ScrollView horizontal style={styles.scrollViewContainer}>
        <Card title="Road Services" color="#9CCDDB" />
        <Card title="Consultation" color="#9CCDDB" />
      </ScrollView>
      <Text style={styles.requestsText}>Current Requests</Text>
      <View style={styles.requestsContainer}>
       
        <Image source={require("../../assets/images/No Search Result.jpg")} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    margin: 2,
    backgroundColor: "rgb(251, 245, 247)",
  },
  homeHeader: {
    margin: 2,
    padding: 15,
    height: 70,
    width: '100%',
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  text: {
    margin: 3,
    color: '#000',
    fontSize: 18,
    fontWeight: "bold"
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  scrollViewContainer: {
    backgroundColor: 'rgb(251, 245, 247)',
    paddingHorizontal: 10,
    marginVertical: 0,
    // height:  
  },
  card: {
    width: 250,
    height: 200,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  requestsContainer: {
    flex:1,
    paddingHorizontal: 10, // Align with scrollViewContainer padding
    paddingTop: 0, // Remove top padding to reduce space
  },
  requestsText: {
    margin: 5, 
    color: '#000',
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily:'Oswald',
  },
  image: {
    width: "100%",
    height: 370,
    resizeMode: 'cover',
  },
});

export default Home;
