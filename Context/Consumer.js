import React, { createContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MyStack from "../Navigations/StackNavigation"

export const ConsumersContext=createContext()


const Consumer = ({children}) => {
    
    
const [serviceType,setServiceType] = useState([])
const [currentVehicle, setCurrentVehicle]=useState()
const [paymentMethod, setPaymentMethod]=useState()




    return (
        <ConsumersContext.Provider value={{serviceType,setServiceType,currentVehicle, setCurrentVehicle,paymentMethod, setPaymentMethod}}>
                {children}
        </ConsumersContext.Provider>
    );
}

const styles = StyleSheet.create({})

export default Consumer;
