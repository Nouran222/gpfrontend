import { createStackNavigator } from '@react-navigation/stack';
import ConsumerRegisterScreen from '../Screens/Registeration/ConsumerRegisterScreen'
import ProviderRegisterScreen from '../Screens/Registeration/ProviderRegisterScreen'
import LoginScreen from '../Screens/Login/ConsumerLoginScreen'
import userTypeScreen from '@/Screens/SplashScreens/userTypeScreen';
import SplashScreen from '@/Screens/SplashScreens/splashscreen';
import RoadServiceScreen from '@/Screens/RoadServices/roadServiceScreen';
import Home from "../Screens/Home/Home"
import Vehichles from "../Screens/RoadServices/Vehicles"
import ProviderHomeScreen from "../Screens/ProviderScreens/ProviderHomeScreen"
import Profile from "../Screens/Profile/profile"
import ProviderHomeScreen2 from "../Screens/ProviderScreens/searchLocation"
import Payment from "../Screens/Payment/payment"

const Stack = createStackNavigator();
export function MyStack() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen name='payment' component={Payment} options={{headerShown: false}}/>
      
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
      <Stack.Screen name='ProviderHomeScreen2' component={ProviderHomeScreen2} options={{headerShown: false}}/>
      <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
      <Stack.Screen name='ProviderHomeScreen' component={ProviderHomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Vehichles' component={Vehichles} options={{headerShown: false}}/>
      <Stack.Screen name='userTypeScreen' component={userTypeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ConsumerRegScreen" component={ConsumerRegisterScreen} options={{headerShown:false}} />
      <Stack.Screen name="ProviderRegScreen" component={ProviderRegisterScreen} options={{headerShown:false}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name='Road Services' component={RoadServiceScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}