import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import ButtonFunction from '../../components/ButtonFunction';
import SearchScreen from './SearchScreen';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';
import AddScreen from './AddScreen';

import * as utils from '../../utils';

const Stack = createNativeStackNavigator();

function Schedule(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: utils.convertMonthToString(new Date().getUTCMonth()),
          headerTitleAlign: 'left',
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
