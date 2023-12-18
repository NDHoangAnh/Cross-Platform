import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/scenes/Home';
import Login from './src/scenes/Login';
import SignUp from './src/scenes/SignUp';
import VerifyOTP from './src/scenes/VerifyOTP';
import ForgotPassword from './src/scenes/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForumStackScreen from './src/scenes/Forum/index';
import ProfileStackScreen from './src/scenes/ProfilePage';
import ScheduleStackScreen from './src/scenes/Schedule';
import TargetScreen from './src/scenes/Target';
import Menu from './src/scenes/Menu/Menu';
import KlassStackScreen from './src/scenes/Klass';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  // Change back to false in real app
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if storage is empty
  const isAsyncStorageEmpty = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      return allKeys.length === 0;
    } catch (error) {
      console.error('Error checking AsyncStorage:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkAsyncStorage = async () => {
      const isEmpty = await isAsyncStorageEmpty();
      // isEmpty here
      // setIsLoggedIn(true);
      setIsLoggedIn(!isEmpty);
    };

    checkAsyncStorage();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Target" component={TargetScreen} />
          <Tab.Screen name="Forum" component={ForumStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
          <Tab.Screen name="Schedule" component={ScheduleStackScreen} />
          <Tab.Screen name="Menu">
            {props => <Menu {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
          <Tab.Screen name="Class" component={KlassStackScreen} />
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
