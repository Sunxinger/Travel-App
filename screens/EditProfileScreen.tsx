import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ route, navigation }) => {
  const { userName, userAvatar } = route.params;
  const [newUserName, setNewUserName] = useState(userName);
  const [newUserAvatar, setNewUserAvatar] = useState(userAvatar);

  const handleSave = async () => {
    try {
      // 使用AsyncStorage将用户名和头像保存起来
      await AsyncStorage.setItem('userName', newUserName);
      await AsyncStorage.setItem('userAvatar', newUserAvatar);
      navigation.goBack(); // 返回UserScreen页面
    } catch (error) {
      // 保存出错的处理逻辑
      console.error(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setNewUserAvatar(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setNewUserAvatar(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        {newUserAvatar ? (
          <Image source={{ uri: newUserAvatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>+</Text>
          </View>
        )}
      </TouchableOpacity>
      <TextInput
        value={newUserName}
        onChangeText={setNewUserName}
        style={styles.nameInput}
        placeholder="Enter your name"
      />
      <View style={styles.buttonContainer}>
        <Button title="Take Photo" onPress={takePhoto} />
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E1E1E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 50,
    color: '#FFFFFF',
  },
  nameInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default EditProfileScreen;
