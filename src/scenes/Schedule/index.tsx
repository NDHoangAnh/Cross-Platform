/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ButtonFunction from '../../components/ButtonFunction';
import DetailScreen from './DetailScreen';
import EditScreen from './EditScreen';
import AddScreen from './AddScreen';
import * as utils from '../../utils';

const ScheduleStack = createNativeStackNavigator();

function ScheduleStackScreen(): React.JSX.Element {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: utils.convertMonthToString(new Date().getUTCMonth()),
          headerTitleAlign: 'left',
          headerRight: navigation => <ButtonFunction navigation={navigation} />,
        }}
      />
      <ScheduleStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <ScheduleStack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          headerShown: false,
        }}
      />
      <ScheduleStack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          headerShown: false,
        }}
      />
    </ScheduleStack.Navigator>
  );
}

export default ScheduleStackScreen;
