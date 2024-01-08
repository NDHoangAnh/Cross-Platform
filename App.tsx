/* eslint-disable react/no-unstable-nested-components */
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {KeyboardAvoidingView, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Login from './src/scenes/Login';
import SignUp from './src/scenes/SignUp';
import VerifyOTP from './src/scenes/VerifyOTP';
import ForgotPassword from './src/scenes/ForgotPassword';
import ForumStackScreen from './src/scenes/Forum/index';
import ProfileStackScreen from './src/scenes/ProfilePage';
import TargetScreen from './src/scenes/Target';
import ScheduleStackScreen from './src/scenes/Schedule';
import Menu from './src/scenes/Menu/Menu';
import KlassStackScreen from './src/scenes/Klass';
import LoadingScreen from './src/scenes/Loading';
import asyncData from './src/config/auth';
import AdminPostScreen from './src/scenes/AdminHomePage/AdminPostScreen';
import AdminHomePage from './src/scenes/AdminHomePage/HomePage';
import MyPostScreen from './src/scenes/MyPost/MyPostScreen';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
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
          <Tab.Screen
            name={role === 'Admin' ? 'User Management' : 'Home'}
            component={
              role === 'Admin'
                ? AdminHomePage
                : role === 'User'
                ? ScheduleStackScreen
                : KlassStackScreen
            }
            options={{
              tabBarIcon: ({color = 'black', size}) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          {role === 'Admin' && (
            <Tab.Screen
              name="Forum Management"
              component={AdminPostScreen}
              options={{
                tabBarIcon: ({color = 'black', size}) => (
                  <MaterialCommunityIcons
                    name="post"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          )}
          {role === 'User' && (
            <>
              <Tab.Screen
                name="Target"
                options={{
                  tabBarIcon: ({color = 'black', size}) => (
                    <MaterialCommunityIcons
                      name="target"
                      color={color}
                      size={size}
                    />
                  ),
                }}
                component={TargetScreen}
              />
              <Tab.Screen
                name="Class"
                options={{
                  tabBarIcon: ({color = 'black', size}) => (
                    <MaterialCommunityIcons
                      name="google-classroom"
                      color={color}
                      size={size}
                    />
                  ),
                }}
                component={KlassStackScreen}
              />
            </>
          )}
          <Tab.Screen
            name="Forum"
            options={{
              tabBarIcon: ({color = 'black', size}) => (
                <MaterialCommunityIcons
                  name="forum"
                  color={color}
                  size={size}
                />
              ),
            }}
            component={ForumStackScreen}
          />
          <Tab.Screen
            name="My Post"
            options={{
              tabBarIcon: ({color = 'black', size}) => (
                <MaterialCommunityIcons
                  name="newspaper-variant-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
            component={MyPostScreen}
          />
          <Tab.Screen
            name="Profile"
            options={{
              tabBarIcon: ({color = 'black', size}) => (
                <AntDesign name="user" color={color} size={size} />
              ),
            }}
            component={ProfileStackScreen}
          />
          <Tab.Screen
            name="Menu"
            options={{
              tabBarIcon: ({color = 'black', size}) => (
                <MaterialCommunityIcons name="menu" color={color} size={size} />
              ),
            }}>
            {props => (
              <Menu
                setRole={setRole}
                role={role}
                navigation={props.navigation}
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
