import axiosInstance from './axiosInstance';

class OTPServices {
  static async sendOTP(data) {
    try {
      const response = await axiosInstance.post('send-otp', data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async verifyOTP(data) {
    try {
      const response = await axiosInstance.post('verify-otp', data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async forgotPassword(data) {
    try {
      const response = await axiosInstance.post('reset-password', data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async checkPhoneExists(data) {
    try {
      const response = await axiosInstance.post('check-phone-number', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default OTPServices;
