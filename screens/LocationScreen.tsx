import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getData, storeData } from '../services/LocalStorageService';
import * as Location from 'expo-location';
import DataService from '../services/DataService';
import { useNavigation } from '@react-navigation/native'; // 引入useNavigation

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const navigation = useNavigation(); // 使用useNavigation hook

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);

    // 更新地图视图中心
    mapRef.current?.animateToRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);

    // 保存新的位置数据到本地
    saveLocationData(currentLocation.coords);
  };

  const handleSendLocation = async () => {
    if (location) {
      await DataService.sendLocationViaHttp(location);
    }
  };

  // 定义saveLocationData函数，用于添加位置数据到本地存储中的数组
  const saveLocationData = async (newLocationCoords) => {
    const existingLocations = await getData('locations') || [];
    const newLocation = {
      ...newLocationCoords,
      timestamp: new Date().toISOString(),
    };
    await storeData('locations', [...existingLocations, newLocation]);
  };

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
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // 默认值
          longitude: -122.4324, // 默认值
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location"
          />
        )}
      </MapView>
      <Text style={styles.text}>
        {location ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}` : 'No location data.'}
      </Text>
      <Button title="Get Location" onPress={getLocation} />
      <Button title="Send Location" onPress={handleSendLocation} />
      {/* 新增按钮用于跳转到LocationHistoryScreen */}
      <Button title="View Location History" onPress={() => navigation.navigate('LocationHistory')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },
  text: {
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default LocationScreen;
