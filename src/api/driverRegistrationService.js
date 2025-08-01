import axiosInstance from './axiosInstance';

class DriverRegistrationService {
  static async driverSignUp(data, config) {
    try {
      const response = await axiosInstance.post('registerDriver', data, config);
      return response;
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    }
  }

  static async updateDriver(data, id, config) {
    try {
      const response = await axiosInstance.put(
        `updateDriver/${id}`,
        data,
        config,
      );
      return response;
    } catch (error) {
      console.error('Update Error:', error);
      throw error;
    }
  }

  static async driverLogin(data) {
    try {
      const response = await axiosInstance.post('loginDriver', data);
      return response;
    } catch (error) {
      console.error('Signup Error:', error);
      throw error;
    }
  }

  static async getAllDrivers() {
    try {
      const response = await axiosInstance.get('drivers');
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async getDriverById(id) {
    try {
      const response = await axiosInstance.get(`drivers/${id}`);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async updateDeviceToken(driverId, deviceToken) {
    try {
      const response = await axiosInstance.put('update-device-token', {
        driverId,
        deviceToken,
      });
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default DriverRegistrationService;
