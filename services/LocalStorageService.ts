// services/LocalStorageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // 如果有错误，可以在这里添加错误处理逻辑
    console.error("Error storing data", e);
  }
};

export const getData = async (key: string): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // 如果有错误，可以在这里添加错误处理逻辑
    console.error("Error retrieving data", e);
    return null;
  }
};
