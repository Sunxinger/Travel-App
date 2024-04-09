import React from 'react';
import { View, Text, StyleSheet, Button, Linking, Alert } from 'react-native';

const UserScreen = ({ navigation }) => {
  // 紧急电话号码
  const emergencyNumber = '999'; 
  
  const handlePressEmergency = () => {
    // 询问用户是否确定
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
      <Text style={styles.title}>WELCOME</Text>
  
      <Button
        title="Translate"
        onPress={() => navigation.navigate('TranslateScreen')}
      />
      <Button
        title="Currency"
        onPress={() => navigation.navigate('CurrencyRatesScreen')}
      />
      <Button
        title="Weather"
        onPress={() => navigation.navigate('WeatherScreen')}
      />
      <Button
        title="Emergency Call"
        onPress={handlePressEmergency}
        color="red"
      />
      
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
  emergencyButton: {
    backgroundColor: 'red', 
  },
  // 根据需要添加更多样式
});

export default UserScreen;
