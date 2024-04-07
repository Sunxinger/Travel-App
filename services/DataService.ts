// services/DataService.ts
import axios from 'axios';
import * as SMS from 'expo-sms';

class DataService {
  async sendLocationViaHttp(location: { latitude: number; longitude: number; }) {
    try {
      const response = await axios.post('http://172.20.10.3:3000/location', {
        latitude: location.latitude,
        longitude: location.longitude,
      });
      console.log('Location sent via HTTP:', response.data);
    } catch (error) {
      console.error('HTTP send error:', error);
    }
  }

  async sendLocationViaSms(phoneNumbers: string[], message: string) {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(phoneNumbers, message);
      console.log('SMS send result:', result);
    } else {
      console.error('SMS is not available on this device');
    }
  }
}

export default new DataService();
