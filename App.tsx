import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './src/scenes/Home';
import Settings from './src/scenes/Settings';
import Login from './src/scenes/Login';
import ForumStackScreen from './src/scenes/Forum/index';
import HomeScheduleScreen from './src/scenes/Schedule/HomeScheduleScreen';
import SearchScheduleScreen from './src/scenes/Schedule/SearchScheduleScreen';
import EditScheduleScreen from './src/scenes/Schedule/EditScheduleScreen';
import AddScheduleScreen from './src/scenes/Schedule/AddScheduleScreen';
import DetailScheduleScreen from './src/scenes/Schedule/DetailScheduleScreen';
import ButtonFunction from './src/components/schedule/ButtonFunction';

import 'react-native-gesture-handler';
import SignUp from './src/scenes/SignUp';
import VerifyOTP from './src/scenes/VerifyOTP';
import ForgotPassword from './src/scenes/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerSchedule() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScheduleScreen}
        options={{
          headerTitle: 'Tháng 1',
          headerTitleAlign: 'left',
          headerRight: ButtonFunction,
        }}
      />
    </Drawer.Navigator>
  );
}

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
      setIsLoggedIn(!empty);
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
          <Tab.Screen name="Forum" component={ForumStackScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login">
            {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen
            name="Root"
            component={DrawerSchedule}
            options={{
              headerTitleAlign: 'left',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScheduleScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScheduleScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditScreen"
            component={EditScheduleScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddScreen"
            component={AddScheduleScreen}
            options={{
              headerShown: false,
            }}
          />
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
