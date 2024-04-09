import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TranslateScreen = () => {
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const translateText = async () => {
    if (!inputText) return;

    
    try {
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?target=${language}&q=${encodeURIComponent(inputText)}&key=AIzaSyB-ROOjVyQT4-RFawmTytDlVmkmma55rTI`, {
        method: 'POST',
      });
      const responseJson = await response.json();
      setTranslatedText(responseJson.data.translations[0].translatedText);
    } catch (e) {
      console.error('Error translating text', e);
      setTranslatedText('Error translating text.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.translationResultContainer}>
        <Text style={styles.translatedText}>{translatedText}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter text to translate"
        onChangeText={setInputText}
        value={inputText}
      />
      <Picker
        selectedValue={language}
        style={styles.picker}
        onValueChange={setLanguage}
        mode="dropdown"
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="German" value="de" />
        <Picker.Item label="Italian" value="it" />
        <Picker.Item label="Japanese" value="ja" />
        <Picker.Item label="Korean" value="ko" />
        <Picker.Item label="Chinese (Simplified)" value="zh-CN" />
        {/* ...其他语言 */}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={translateText}>
        <Text style={styles.buttonText}>Translate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  translationResultContainer: {
    width: '100%',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 60,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  translatedText: {
    fontSize: 24,
    color: '#333',
  },
});

export default TranslateScreen;
