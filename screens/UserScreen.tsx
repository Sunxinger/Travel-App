import React from 'react';
import { View, Text, StyleSheet, Button, Linking, Image, Alert } from 'react-native';

const UserScreen = ({ navigation }) => {

  const emergencyNumber = '999'; 
  
  const handlePressEmergency = () => {
 
    Alert.alert(
      'Emergency Call',
      'An emergency call will be made, continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Call',
          onPress: () => Linking.openURL(`tel:${emergencyNumber}`),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Image
        source={require('../assets/image.png')}
        style={styles.image}
      />
      <View style={styles.container}>
  <View style={styles.buttonContainer}>
    <Button
      title="Translate"
      onPress={() => navigation.navigate('TranslateScreen')}
    />
  </View>
  <View style={styles.buttonContainer}>
    <Button
      title="Currency"
      onPress={() => navigation.navigate('CurrencyRatesScreen')}
    />
  </View>
  <View style={styles.buttonContainer}>
    <Button
      title="Weather"
      onPress={() => navigation.navigate('WeatherScreen')}
    />
  </View>
  <View style={styles.buttonContainer}>
    <Button
      title="Emergency Call"
      onPress={handlePressEmergency}
      color="red"
    />
  </View>
</View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 10, 
  },
 
});

export default UserScreen;
