import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Header } from 'react-native-elements';

const MyAppBar = ({ navigation }) => {
    return (
        <Header
            statusBarProps={{ barStyle: 'light-content' }}
            backgroundColor="#587FA7"
            leftComponent={{ text: "O2torni", style: { color: '#fff' } }}
            rightComponent={{
                icon: 'logout',
                color: '#fff',
                onPress: async() =>{
                    await AsyncStorage.clear();
                    navigation.navigate('LoginScreen')

                },
            }}
        />
    );
};

export default MyAppBar;