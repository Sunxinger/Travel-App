import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import TranslateScreen from './screens/TranslateScreen'; // 确保已经创建了这个文件
import LocationScreen from './screens/LocationScreen';
import LocationHistoryScreen from './screens/LocationHistoryScreen';
import CreateLogScreen from './screens/CreateLogScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserMain"
        component={UserScreen}
        options={{ title: 'User Profile' }} // 你可以自定义标题
      />
      <Stack.Screen
        name="TranslateScreen"
        component={TranslateScreen}
        options={{ title: 'Translate' }} // 添加TranslateScreen到UserStack中
      />
      {/* 如果UserStack中有其他屏幕，继续添加它们 */}
    </Stack.Navigator>
  );
}

function LocationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LocationMain"
        component={LocationScreen}
        options={{ title: 'Location' }}
      />
      <Stack.Screen
        name="LocationHistory"
        component={LocationHistoryScreen}
        options={{ title: 'Location History' }}
      />
      {/* 添加LocationStack中的其他屏幕 */}
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="CreateLog"
        component={CreateLogScreen}
        options={{ title: 'Create Log' }}
      />
      {/* 添加HomeStack中的其他屏幕 */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="User" component={UserStack} />
        <Tab.Screen name="Location" component={LocationStack} />
        {/* 如果有其他的Tab，继续添加它们 */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
