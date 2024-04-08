import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // 引入堆栈导航器
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LocationScreen from './screens/LocationScreen';
import LocationHistoryScreen from './screens/LocationHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // 创建堆栈导航器实例


function LocationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LocationMain" component={LocationScreen} options={{ title: ' ' }} />
      <Stack.Screen name="LocationHistory" component={LocationHistoryScreen} options={{ title: 'History' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Location" component={LocationStack} /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}
