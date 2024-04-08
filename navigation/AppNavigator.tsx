import React from 'react';
// 导入React Navigation库中的组件
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// 导入屏幕组件
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import LocationScreen from '../screens/LocationScreen'; // 根据你的文件结构更新路径


// 使用createBottomTabNavigator创建一个Tab导航器
const Tab = createBottomTabNavigator();

// 创建并导出AppNavigator组件
const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }} // 可选配置，用于隐藏每个屏幕顶部的导航栏
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Location" component={LocationScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
