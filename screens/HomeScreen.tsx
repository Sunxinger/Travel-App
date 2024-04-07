// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LocationService from '../services/LocationService';

const HomeScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let currentLocation = await LocationService.getCurrentLocation();
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* 在地图上方显示经纬度信息 */}
      {location ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Latitude: {location.coords.latitude}</Text>
          <Text style={styles.infoText}>Longitude: {location.coords.longitude}</Text>
        </View>
      ) : (
        <Text>Fetching location...</Text>
      )}
      {/* 地图显示当前位置 */}
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
            description={"You are here"}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  infoContainer: {
    position: 'absolute',
    top: 10,
    alignItems: 'center',
    zIndex: 1, // 确保文本显示在地图上方
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
