import { createStackNavigator } from '@react-navigation/stack';
import ConsumerRegisterScreen from '../Screens/Registeration/ConsumerRegisterScreen'
import ProviderRegisterScreen from '../Screens/Registeration/ProviderRegisterScreen'
import LoginScreen from '../Screens/ConsumerLoginScreen'
import SplashScreen from '@/Screens/SplashScreens/splashscreen';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown: false}}/>
      <Stack.Screen name="ConsumerRegScreen" component={ConsumerRegisterScreen} />
      <Stack.Screen name="ProviderRegScreen" component={ProviderRegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}