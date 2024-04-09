import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentWeather();
  }, []);

  const getCurrentWeather = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      setLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    fetchWeather(location.coords.latitude, location.coords.longitude);
  };

  const fetchWeather = async (lat, lon, city = '') => {
    const apiKey = 'ff5b3dfdeb594b2ba5d02907240904'; // 替换为你的WeatherAPI密钥
    let url = city
      ? `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      : `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        setWeather(data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCity = () => {
    if (city) {
      fetchWeather(null, null, city);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={handleSearchCity} />
      {weather && (
        <View>
          <Text style={styles.title}>{weather.location.name}</Text>
          <Text>Temperature: {weather.current.temp_c}°C</Text>
          <Text>Weather: {weather.current.condition.text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  loader: {
    marginTop: 20,
  },
  weatherInfo: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default WeatherScreen;
