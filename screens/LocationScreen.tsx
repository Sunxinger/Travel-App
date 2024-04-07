import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { storeData, getData } from '../services/LocalStorageService';
import * as Location from 'expo-location';
import DataService from '../services/DataService';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);

    // 当位置更新时，使用animateToRegion让地图视图居中到新位置
    mapRef.current?.animateToRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000); // 1000是动画持续时间（毫秒）

    await storeData('lastLocation', currentLocation.coords);
  };

  const handleSendLocation = async () => {
    if (location) {
      await DataService.sendLocationViaHttp(location);
    }
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
          latitude: 37.78825, // 默认值，第一次渲染地图时使用
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
