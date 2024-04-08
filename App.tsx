import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LocationScreen from './screens/LocationScreen';
import LocationHistoryScreen from './screens/LocationHistoryScreen';
import CreateLogScreen from './screens/CreateLogScreen'; // 确保你已创建此屏幕

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LocationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LocationMain" component={LocationScreen} options={{ title: 'Location' }} />
      <Stack.Screen name="LocationHistory" component={LocationHistoryScreen} options={{ title: 'History' }} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="CreateLog" component={CreateLogScreen} options={{ title: 'Create Log' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Location" component={LocationStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
