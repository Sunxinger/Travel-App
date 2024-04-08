import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
  const [userName, setUserName] = useState('Amir-Zhen');
  const [userAvatar, setUserAvatar] = useState(null);
  const navigation = useNavigation();

  const handleEditPress = () => {
    navigation.navigate('EditProfile', { userName, userAvatar, setUserName, setUserAvatar });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        {userAvatar ? (
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>+</Text>
          </View>
        )}
        <Text style={styles.userName}>{userName}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>EDIT</Text>
        </TouchableOpacity>
      </View>

      {/* 下面的代码保持不变，确保现有的功能可用 */}
      <View style={styles.tilesContainer}>
        <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('Translation')}>
          <Text style={styles.tileText}>Translation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('CurrencyConverter')}>
          <Text style={styles.tileText}>Currency Converter</Text>
        </TouchableOpacity>
        {/* More tiles for other features like Weather, Emergency Help, etc. */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 50,
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    marginTop: 10,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tile: {
    width: '40%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tileText: {
    fontSize: 18,
  },
});

export default UserScreen;
