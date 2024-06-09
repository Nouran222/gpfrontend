import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const MyButton = ({ text, onPressHandler }) => {
  return (
    <View style={styles.BtnContainer}>
      <Pressable
        android_ripple={{ color: 'black' }}
        onPress={onPressHandler}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'grey' : 'black',
            borderRadius: 5,
          },
          styles.Btn,
        ]}
      >
        <Text style={styles.BtnText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  BtnContainer: {
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  Btn: {
    padding: 10,
  },
  BtnText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default MyButton;
