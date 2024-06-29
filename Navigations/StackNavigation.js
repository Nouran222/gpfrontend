// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsumerRegisterScreen from "../Screens/Registeration/ConsumerRegisterScreen";
import ProviderRegisterScreen from "../Screens/Registeration/ProviderRegisterScreen";
import LoginScreen from "../Screens/Login/ConsumerLoginScreen";
// import userTypeScreen from "@/Screens/SplashScreens/userTypeScreen";
import SplashScreen from "@/Screens/SplashScreens/splashscreen";
import RoadServiceScreen from "@/Screens/RoadServices/roadServiceScreen";
// import Home from "../Screens/Home/Home"
import ProviderHomeScreen from "../Screens/ProviderScreens/ProviderHomeScreen";
// import Profile from "../Screens/Profile/profile"
import ProviderHomeScreen2 from "../Screens/ProviderScreens/searchLocation";
import Payment from "../Screens/Payment/payment";
import BottomTabNavigator from "./BottomTabNavigator";
import PayPal from "../Screens/Payment/PayPal";
import AddVehicle from "../Screens/RoadServices/AddVehicle";
import RequestScreen from "@/Screens/ProviderScreens/RequestScreen";
import ChatbotScreen from "./../Screens/ChatbotScreen/ChatbotScreeen";
// import MyAppBar from "../components/AppBar";
import Consumer from "../Context/Consumer";
import Vehicles from "./../Screens/RoadServices/Vehicles";
import * as Linking from "expo-linking";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const linking = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Home: "Home",
      Payment: "Payment",
    },
  },
};
export function MyStack() {
  return (
    <Consumer>
      {/* <NavigationContainer linking={linking}> */}

      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AddVehicle"
          component={AddVehicle}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Vehicles"
          component={Vehicles}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PayPal"
          component={PayPal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProviderHomeScreen2"
          component={ProviderHomeScreen2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProviderHomeScreen"
          component={ProviderHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
                    name="userTypeScreen"
                    component={userTypeScreen}
                    options={{
                        header: ({ route, navigation }) => (
                            <MyAppBar title="User Type" />
                        ),
                    }}
                /> */}
        <Stack.Screen
          name="ConsumerRegScreen"
          component={ConsumerRegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
                    name="ProviderRegScreen"
                    component={ProviderRegisterScreen}
                    options={{
                        header: ({ route, navigation }) => (
                            <MyAppBar title="Provider Register" />
                        ),
                    }}
                /> */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Road Services"
          component={RoadServiceScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatbotScreen"
          component={ChatbotScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RequestScreen"
          component={RequestScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      {/* </NavigationContainer> */}
    </Consumer>
  );
}
export default MyStack;
