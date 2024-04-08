import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateLogScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    (async () => {
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (imagePickerStatus.status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }

      const locationStatus = await Location.requestForegroundPermissionsAsync();
      if (locationStatus.status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setTimestamp(new Date().toLocaleString());
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const saveLog = async () => {
    const newLog = {
      title,
      content,
      imageUri,
      location,
      timestamp,
    };

    const existingLogs = JSON.parse(await AsyncStorage.getItem('logs')) || [];
    await AsyncStorage.setItem('logs', JSON.stringify([...existingLogs, newLog]));

    Alert.alert('Log Saved', 'Your log has been saved successfully.');
    // Optionally reset form here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        placeholder="Enter title here"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Text style={styles.label}>Content:</Text>
      <TextInput
        placeholder="Enter content here"
        value={content}
        onChangeText={setContent}
        style={[styles.input, styles.textArea]}
        multiline
      />
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.thumbnail} />}
      {location && (
        <Text style={styles.location}>Location: Lat {location.latitude}, Lon {location.longitude}</Text>
      )}
      <Text style={styles.timestamp}>Timestamp: {timestamp}</Text>
      <Button title="Submit Log" onPress={saveLog} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
  },
  location: {
    marginTop: 10,
  },
  timestamp: {
    marginTop: 10,
  },
});

export default CreateLogScreen;
