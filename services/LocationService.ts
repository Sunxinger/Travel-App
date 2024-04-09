import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';
import DataService from './DataService'; 

class LocationService {
  // 获取当前位置
  async getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  }


  async sendLocation() {
    try {
      const location = await this.getCurrentLocation();
      if (!location) {
        console.error('Failed to get location');
        return;
      }

     
      const state = await NetInfo.fetch();

      if (state.isConnected) {
        // 设备在线，通过HTTP发送位置
        DataService.sendLocationViaHttp({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        // 设备离线，通过SMS发送位置
       
        const phoneNumber = '07398413006';
        const message = `Location: Latitude ${location.coords.latitude}, Longitude ${location.coords.longitude}`;
        DataService.sendLocationViaSms([phoneNumber], message);
      }
    } catch (error) {
      console.error('Error sending location:', error);
    }
  }
}

export default new LocationService();
