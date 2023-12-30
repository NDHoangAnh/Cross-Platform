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
import TargetScreen from './src/scenes/Target';
import AdminHomePageStackScreen from './src/scenes/AdminHomePage';
import ScheduleStackScreen from './src/scenes/Schedule';
import Menu from './src/scenes/Menu/Menu';
import KlassStackScreen from './src/scenes/Klass';
import LoadingScreen from './src/scenes/Loading';
import Settings from './src/scenes/Settings';
import asyncData from './src/config/auth';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      if (isEmpty === false) {
        const user1 = await asyncData.getData();
        setIsAdmin(user1?.role === 'Admin');
      }

      setIsLoggedIn(!isEmpty);
      setIsLoading(false);
    };

    checkAsyncStorage();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator screenOptions={{headerShown: false}}>
          {isAdmin && (
            <Tab.Screen name="Home" component={AdminHomePageStackScreen} />
          )}
          {!isAdmin && <Tab.Screen name="Home" component={Home} />}
          <Tab.Screen name="Settings">
            {/* Pass this function if that page have the logout button */}
            {props => <Settings {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen>
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
