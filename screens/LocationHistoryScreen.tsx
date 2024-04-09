// LocationHistoryScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { getData, clearData } from '../services/LocalStorageService'; // 确保路径正确
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

  // 删除所有位置记录
  const handleDelete = async () => {
    await clearData('locations');
    setLocationRecords([]); // 更新状态，清除位置记录
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {locationRecords.map((record, index) => (
          <View key={index} style={styles.recordItem}>
            <Text style={styles.text}>Latitude: {record.latitude}</Text>
            <Text style={styles.text}>Longitude: {record.longitude}</Text>
            <Text style={styles.text}>Time: {new Date(record.timestamp).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete All</Text>
      </TouchableOpacity>
    </View>
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
  deleteButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LocationHistoryScreen;
