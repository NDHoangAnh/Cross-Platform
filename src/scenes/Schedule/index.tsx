/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './HomeScreen';
// import EmptyScreen from './src/EmptyScreen';
import ButtonFunction from '../../components/ButtonFunction';
import SearchScreen from './SearchScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';
import AddScreen from './AddScreen';
// import { TouchableHighlight } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// function Root(): React.JSX.Element {
//   return (
//     <Drawer.Navigator initialRouteName="Home" >
//       <Drawer.Screen name="Home" component={HomeScreen} options={{headerTitle:'Tháng 1',
//         headerTitleAlign:'left',
//         headerRight: ButtonFunction}} />
//       <Drawer.Screen name="Profile" component={EmptyScreen} />
//       <Stack.Screen name="Settings" component={EmptyScreen} />
//     </Drawer.Navigator>
//   );
// }

function Schedule(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'left'}}>
      <Stack.Screen
        name="Root"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'left',
          headerShown: false,
          headerTitle: 'Tháng 1',
          headerRight: ButtonFunction,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Schedule;
