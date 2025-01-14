import axiosInstance from './axiosInstance';

class LocationRateService {
    static async createLocationRate(data) {
        try {
            const response = await axiosInstance.post(`location-rates`, data);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async getAllLocationRates() {
        try {
            const response = await axiosInstance.get(`location-rates`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async getLocationRate(searchParams) {
        try {
            const response = await axiosInstance.get(`location-rates/search`, { params: searchParams });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async getRatesByLocation(location) {
        try {
            const response = await axiosInstance.get(`location-rates/location/${location}`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async updateLocationRate(id, data) {
        try {
            const response = await axiosInstance.put(`location-rates/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async deleteLocationRate(id) {
        try {
            const response = await axiosInstance.delete(`location-rates/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

export default LocationRateService;
