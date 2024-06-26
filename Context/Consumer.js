import React, { createContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import MyStack from "../Navigations/StackNavigation";

export const ConsumersContext = createContext();

const Consumer = ({ children }) => {
  const [serviceType, setServiceType] = useState([]);
  const [currentVehicle, setCurrentVehicle] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [price, setPrice] = useState();
  const [providerId, setProviderId] = useState();
  const [targetLocation, setTargetLocation] = useState();
  const [consumerName, setConsumerName] = useState();

  return (
    <ConsumersContext.Provider
      value={{
        consumerName,
        setConsumerName,
        serviceType,
        targetLocation,
        setTargetLocation,
        setServiceType,
        currentVehicle,
        setCurrentVehicle,
        paymentMethod,
        setPaymentMethod,
        price,
        setPrice,
        providerId,
        setProviderId,
      }}
    >
      {children}
    </ConsumersContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default Consumer;
