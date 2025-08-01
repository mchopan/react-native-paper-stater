import axiosInstance from './axiosInstance';

class RouteRateMonitorServices {
  static async createRouteRate(data) {
    try {
      const response = await axiosInstance.post('route-rates', data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async getAllRouteRates() {
    try {
      const response = await axiosInstance.get('route-rates');
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async getRouteRateById(id) {
    try {
      const response = await axiosInstance.get(`route-rates/${id}`);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async updateRouteRate(id, data) {
    try {
      const response = await axiosInstance.put(`route-rates/${id}`, data);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  static async deleteRouteRate(id) {
    try {
      const response = await axiosInstance.delete(`route-rates/${id}`);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default RouteRateMonitorServices;
