import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import LocationService from '../services/LocationService'; // 确保路径正确
import DataService from '../services/DataService'; // 确保路径正确
import { useNavigation } from '@react-navigation/native'; // 引入useNavigation

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation(); // 使用useNavigation hook

  useEffect(() => {
    (async () => {
      const currentLocation = await LocationService.getCurrentLocation();
      setLocation(currentLocation);
    })();
  }, []);

  const handleSendLocation = async () => {
    if (location) {
      DataService.sendLocationViaHttp({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // 如果你的DataService需要传递其他参数（比如电话号码等），请相应调整
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
          <Button title="Send Location" onPress={handleSendLocation} />
          {/* 新增按钮，用于导航到CreateLogScreen */}
          <Button title="Create Log" onPress={() => navigation.navigate('CreateLog')} />
        </>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
