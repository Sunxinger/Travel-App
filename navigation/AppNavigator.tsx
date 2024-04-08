// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LocationScreen from '../screens/LocationScreen';
import LocationHistoryScreen from '../screens/LocationHistoryScreen';
import CreateLogScreen from '../screens/CreateLogScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserMain" component={UserScreen} options={{ title: 'User' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
    </Stack.Navigator>
  );
}

// ... 保持LocationStack和HomeStack的代码不变

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="User" component={UserStack} />
      <Tab.Screen name="Location" component={LocationStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
