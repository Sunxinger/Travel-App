import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const CreateLogScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);
  // Assume a default location for simplicity
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [timestamp, setTimestamp] = useState('');
  const logIndex = route.params?.index ?? null;

  useEffect(() => {
    if (route.params?.log) {
      setTitle(route.params.log.title);
      setContent(route.params.log.content);
      setImageUri(route.params.log.imageUri);
      setLocation(route.params.log.location);
      setTimestamp(route.params.log.timestamp);
    }
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
    let logs = await AsyncStorage.getItem('logs');
    logs = logs ? JSON.parse(logs) : [];
    const newLog = { title, content, imageUri, location, timestamp };

    if (logIndex !== null) {
      logs[logIndex] = newLog;
    } else {
      logs.push(newLog);
    }

    await AsyncStorage.setItem('logs', JSON.stringify(logs));
    Alert.alert('Log Saved', 'Your log has been successfully saved.');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Pick an image" onPress={pickImage} />
      <Button title="Save Log" onPress={saveLog} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default CreateLogScreen;