import { createStackNavigator } from '@react-navigation/stack';
import ConsumerRegisterScreen from '../Screens/Registeration/ConsumerRegisterScreen'
import ProviderRegisterScreen from '../Screens/Registeration/ProviderRegisterScreen'
import LoginScreen from '../Screens/ConsumerLoginScreen'

const Stack = createStackNavigator();

export function MyStack() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="ConsumerRegScreen" component={ConsumerRegisterScreen} />
      <Stack.Screen name="ProviderRegScreen" component={ProviderRegisterScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}