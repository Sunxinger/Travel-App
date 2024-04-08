import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Switch, Alert, Linking} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getData, storeData } from '../services/LocalStorageService';
import * as Location from 'expo-location';
import DataService from '../services/DataService';
import { useNavigation } from '@react-navigation/native';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const [isLocationServiceEnabled, setIsLocationServiceEnabled] = useState(false);

  useEffect(() => {
    getLocationOnce();
  }, []);

  const getLocationOnce = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);
    mapRef.current?.animateToRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  };

  const handleSendLocation = async () => {
    if (location) {
      await DataService.sendLocationViaHttp(location);
    }
  };

  useEffect(() => {
    let intervalId;
    if (isLocationServiceEnabled) {
      getLocationPeriodically();
      intervalId = setInterval(getLocationPeriodically, 3000); // 30 minutes
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isLocationServiceEnabled]);

  const getLocationPeriodically = async () => {
    console.log('Attempting to fetch location...');
    // Your location fetching logic here
    handleSendLocation(); // Call your send location function
  };

  const sendSMS = () => {
    const phoneNumber = '+447782621856'; // 要发送的电话号码
    const message = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`; // 要发送的消息内容
  
    // 使用 Linking API 打开设备上的 SMS 应用，并填充电话号码和消息内容
    Linking.openURL(`sms:${phoneNumber}?body=${message}`);
  };
  

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Default values
          longitude: -122.4324, // Default values
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
      <Button title="Send SMS" onPress={sendSMS} />
      <Button title="Get Location" onPress={getLocationOnce} />
      <Button title="Send Location" onPress={handleSendLocation} />
      <Button title="View Location History" onPress={() => navigation.navigate('LocationHistory')} />
      <View style={styles.switchContainer}>
        <Text>Enable Periodic Location Updates:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isLocationServiceEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setIsLocationServiceEnabled(previousState => !previousState)}
          value={isLocationServiceEnabled}
        />
      </View>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default LocationScreen;
