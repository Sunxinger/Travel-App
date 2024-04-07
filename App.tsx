import React from 'react';
// 引入NavigationContainer和底部标签导航器的创建函数
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 引入屏幕组件
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import LocationScreen from './screens/LocationScreen';

// 创建底部标签导航器实例
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // 导航容器包裹你的应用导航结构
    <NavigationContainer>
      {/* 定义底部标签导航器及其屏幕 */}
      <Tab.Navigator>
        {/* 屏幕定义，指定组件 */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Location" component={LocationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

