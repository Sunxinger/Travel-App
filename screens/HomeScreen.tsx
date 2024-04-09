import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, Share } from 'react-native';
import LocationService from '../services/LocationService'; 
import DataService from '../services/DataService'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [logs, setLogs] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchLocationAndLogs = async () => {
      const currentLocation = await LocationService.getCurrentLocation();
      setLocation(currentLocation);
      const storedLogs = await AsyncStorage.getItem('logs');
      if (storedLogs) setLogs(JSON.parse(storedLogs));
    };

    const unsubscribe = navigation.addListener('focus', fetchLocationAndLogs);

    return unsubscribe;
  }, [navigation]);

  const handleSendLocation = async () => {
    if (location) {
      await DataService.sendLocationViaHttp({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  const handleDeleteLog = async (index) => {
    const updatedLogs = [...logs];
    updatedLogs.splice(index, 1);
    await AsyncStorage.setItem('logs', JSON.stringify(updatedLogs));
    setLogs(updatedLogs);
    Alert.alert("Log Deleted", "The log has been successfully deleted.");
  };

  const handleEditLog = (index) => {
    const logToEdit = logs[index];
    navigation.navigate('CreateLog', { log: logToEdit, index: index });
  };

  const handleShareLog = async (log) => {
    try {
      await Share.share({
        message: `Log Title: ${log.title}\nContent: ${log.content}\nLocation: Lat ${log.location.latitude}, Lon ${log.location.longitude}\nTimestamp: ${log.timestamp}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {location ? (
        <>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
          <Button title="Create Log" onPress={() => navigation.navigate('CreateLog')} />
        </>
      ) : (
        <Text>Fetching location...</Text>
      )}
      <View style={styles.logContainer}>
        {logs.map((log, index) => (
          <View key={index} style={styles.log}>
            <Text>Title: {log.title}</Text>
            <Text>Content: {log.content}</Text>
            <Text>Timestamp: {log.timestamp}</Text>
            <Text>Location: Lat {log.location?.latitude}, Lon {log.location?.longitude}</Text>
            <Button title="Delete" onPress={() => handleDeleteLog(index)} />
            <Button title="Edit" onPress={() => handleEditLog(index)} />
            <Button title="Share" onPress={() => handleShareLog(log)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logContainer: {
    marginTop: 20,
  },
  logTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  log: {
    marginBottom: 20,
  },
});

export default HomeScreen;
