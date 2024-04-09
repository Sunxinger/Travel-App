import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentWeather();
  }, []);

  const getCurrentWeather = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      error => {
        console.error(error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const fetchWeather = async (lat, lon, city = '') => {
    setLoading(true);
    const apiKey = '3bfc67e47b778889c33dd2d8b63a94f7';
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

    if (city !== '') {
      url += `&q=${city}`;
    } else {
      url += `&lat=${lat}&lon=${lon}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        console.error('Failed to fetch weather data:', data.message);
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
          <Text style={styles.title}>{weather.name}</Text>
          <Text>Temperature: {weather.main.temp} °C</Text>
          <Text>Weather: {weather.weather[0].main}</Text>
          <Text>Humidity: {weather.main.humidity}%</Text>
        </View>
      )}
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
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default WeatherScreen;
