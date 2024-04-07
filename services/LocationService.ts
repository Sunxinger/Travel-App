// services/LocationService.ts
import * as Location from 'expo-location';

class LocationService {
  async getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  }
}

export default new LocationService();
