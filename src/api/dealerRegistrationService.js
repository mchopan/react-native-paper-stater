import axiosInstance from './axiosInstance';

class DealerRegistrationService {
    static async signUp(data) {
        try {
            const response = await axiosInstance.post(`register`, data);
            return response;
        } catch (error) {
            console.error('Signup Error:', error);
            throw error;
        }
    }
    static async updateDealer(data, id, config) {
        try {
            const response = await axiosInstance.put(`updateDealer/${id}`, data, config);
            return response;
        } catch (error) {
            console.error('Update Error:', error);
            throw error;
        }
    }

    static async login(data) {
        try {
            const response = await axiosInstance.post(`login`, data);
            return response;
        } catch (error) {
            console.error('Signup Error:', error);
            throw error;
        }
    }

    static async updateDealerDeviceToken(dealerId, deviceToken) {
        try {
            const response = await axiosInstance.put(`update-dealer-device-token`, { dealerId, deviceToken });
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

export default DealerRegistrationService;