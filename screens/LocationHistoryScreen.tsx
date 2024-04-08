// LocationHistoryScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getData } from '../services/LocalStorageService'; // 确保路径正确
import { useFocusEffect } from '@react-navigation/native';

const LocationHistoryScreen = () => {
  const [locationRecords, setLocationRecords] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchLocationRecords = async () => {
        const records = await getData('locations');
        if (records) {
          setLocationRecords(records);
        }
      };

      fetchLocationRecords();
      return () => {}; // 返回一个空函数作为清理操作
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {locationRecords.map((record, index) => (
        <View key={index} style={styles.recordItem}>
          <Text style={styles.text}>Latitude: {record.latitude}</Text>
          <Text style={styles.text}>Longitude: {record.longitude}</Text>
          <Text style={styles.text}>Time: {new Date(record.timestamp).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  recordItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default LocationHistoryScreen;
