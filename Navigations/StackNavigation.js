import { createStackNavigator } from '@react-navigation/stack';
import ConsumerRegisterScreen from '../Screens/Registeration/ConsumerRegisterScreen'
import ProviderRegisterScreen from '../Screens/Registeration/ProviderRegisterScreen'
import LoginScreen from '../Screens/Login/ConsumerLoginScreen'
import userTypeScreen from '@/Screens/SplashScreens/userTypeScreen';
import SplashScreen from '@/Screens/SplashScreens/splashscreen';
import Home from "../Screens/Home/Home"
const Stack = createStackNavigator();

export function MyStack() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
      <Stack.Screen name='userTypeScreen' component={userTypeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ConsumerRegScreen" component={ConsumerRegisterScreen} options={{headerShown:false}} />
      <Stack.Screen name="ProviderRegScreen" component={ProviderRegisterScreen} options={{headerShown:false}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}