import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import asyncData from './src/config/auth';
import AdminPostScreen from './src/scenes/AdminHomePage/AdminPostScreen';
import AdminHomePage from './src/scenes/AdminHomePage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [role, setRole] = useState<String | null>('');
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
        const user = await asyncData.getData();
        setRole(user?.role || '');
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
          {role === 'Teacher' && (
            <Tab.Screen name="Home" component={KlassStackScreen} />
          )}
          {role === 'User' ? (
            <>
              <Tab.Screen name="Home" component={ScheduleStackScreen} />
              <Tab.Screen name="Target" component={TargetScreen} />
              <Tab.Screen name="Class" component={KlassStackScreen} />
            </>
          ) : (
            <>
              <Tab.Screen name="Home" component={ScheduleStackScreen} />
              <Tab.Screen name="User Management" component={AdminHomePage} />
              <Tab.Screen name="Forum Management" component={AdminPostScreen} />
            </>
          )}
          <Tab.Screen name="Forum" component={ForumStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
          <Tab.Screen name="Menu">
            {props => (
              <Menu
                setRole={setRole}
                role={role}
                {...props}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login">
            {props => (
              <Login
                {...props}
                setRole={setRole}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
