import axiosInstance from './axiosInstance';

class NegotiationServices {
  static async createNegotiation(data) {
    console.log(data, 'reaching here ');
    try {
      const response = await axiosInstance.post('negotiations', data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async addPrice(negotiationId, data) {
    try {
      const response = await axiosInstance.patch(
        `negotiations/${negotiationId}/prices`,
        data,
      );
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async getNegotiationById(id) {
    try {
      const response = await axiosInstance.get(`negotiations/${id}`);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async getAllNegotiationsByBookingId(bookingId) {
    try {
      const response = await axiosInstance.get(
        `negotiations/booking/${bookingId}`,
      );
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async getAllNegotiationsByDealerId(dealerId) {
    try {
      const response = await axiosInstance.get(
        `negotiations/dealer/${dealerId}`,
      );
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async getAllNegotiationsByDriverId(driverId) {
    try {
      const response = await axiosInstance.get(
        `negotiations/driver/${driverId}`,
      );
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async getAllNegotiations() {
    try {
      const response = await axiosInstance.get('negotiations');
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async updateNegotiationStatus(id, status) {
    try {
      const response = await axiosInstance.patch(`negotiations/${id}/status`, {
        status,
      });
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async deleteNegotiation(id) {
    try {
      const response = await axiosInstance.delete(`negotiations/${id}`);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async sendPushNotificationsToAllDealers(data) {
    try {
      const response = await axiosInstance.post('notify-dealers', data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async sendPushNotification(data) {
    try {
      const response = await axiosInstance.post('notify-user', data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default NegotiationServices;
