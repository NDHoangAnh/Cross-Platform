import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/scenes/Home';
import Settings from './src/scenes/Settings';
import Login from './src/scenes/Login';
import SignUp from './src/scenes/SignUp';
import VerifyOTP from './src/scenes/VerifyOTP';
import ForgotPassword from './src/scenes/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForumStackScreen from './src/scenes/Forum/index';
import TargetScreen from "./src/scenes/Target";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  // Function to check if AsyncStorage is empty
  const isAsyncStorageEmpty = async () => {
    try {
      // Retrieve all keys from AsyncStorage
      const allKeys = await AsyncStorage.getAllKeys();

      // Check if there are no keys (i.e., AsyncStorage is empty)
      return allKeys.length === 0;
    } catch (error) {
      console.error('Error checking AsyncStorage:', error);
      // Handle the error as needed
      return false;
    }
  };

  // Check if AsyncStorage is empty before rendering
  React.useEffect(() => {
    const checkAsyncStorage = async () => {
      const empty = await isAsyncStorageEmpty();
      setIsLoggedIn(true);
    };

    checkAsyncStorage();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings">
            {props => <Settings {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
          <Tab.Screen name="Target" component={TargetScreen} />
          <Tab.Screen name="Forum" component={ForumStackScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login">
            {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
