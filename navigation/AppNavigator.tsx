import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import LocationScreen from '../screens/LocationScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
      />
      <Tab.Screen
        name="Location"
        component={LocationScreen}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
