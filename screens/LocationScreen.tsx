// LocationScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { storeData, getData } from '../services/LocalStorageService'; // 更新路径以匹配你的文件结构
import * as Location from 'expo-location';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);

  // 请求位置权限并获取位置
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    // 存储位置数据
    await storeData('lastLocation', currentLocation.coords);
  };

  // 读取位置数据
  useEffect(() => {
    const fetchLocation = async () => {
      const savedLocation = await getData('lastLocation');
      if (savedLocation) {
        setLocation(savedLocation);
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {location ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}` : 'No location data.'}
      </Text>
      <Button title="Get Location" onPress={getLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LocationScreen;
