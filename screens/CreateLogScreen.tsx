import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const CreateLogScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  // UI部分省略，包括文本输入框、按钮等
};

const styles = StyleSheet.create({
  // 样式定义省略
});

export default CreateLogScreen;
