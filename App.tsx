import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './src/scenes/Home';
import Settings from './src/scenes/Settings';
import Login from './src/scenes/Login';
import ForumStackScreen from './src/scenes/Forum/Forum';
import HomeScheduleScreen from './src/scenes/Schedule/HomeScheduleScreen';
import SearchScheduleScreen from './src/scenes/Schedule/SearchScheduleScreen';
import EditScheduleScreen from './src/scenes/Schedule/EditScheduleScreen';
import AddScheduleScreen from './src/scenes/Schedule/AddScheduleScreen';
import DetailScheduleScreen from './src/scenes/Schedule/DetailScheduleScreen';
import ButtonFunction from './src/components/schedule/ButtonFunction';

import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerSchedule() {
  return (
    <Drawer.Navigator initialRouteName="Home" >
      <Drawer.Screen name="Home" component={HomeScheduleScreen} options={{headerTitle:'Tháng 1',
        headerTitleAlign:'left',
        headerRight: ButtonFunction}} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
          <Tab.Screen name="Forum" component={ForumStackScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
