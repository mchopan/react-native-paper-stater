import axiosInstance from './axiosInstance';

class DriverRegistrationService {
    static async driverSignUp(data, config) {
        try {
            const response = await axiosInstance.post(`registerDriver`, data, config);
            return response;
        } catch (error) {
            console.error('Signup Error:', error);
            throw error;
        }
    }

    static async updateDriver(data, id, config) {
        try {
            const response = await axiosInstance.put(`updateDriver/${id}`, data, config);
            return response;
        } catch (error) {
            console.error('Update Error:', error);
            throw error;
        }
    }

    static async driverLogin(data) {
        try {
            const response = await axiosInstance.post(`loginDriver`, data);
            return response;
        } catch (error) {
            console.error('Signup Error:', error);
            throw error;
        }
    }
}

export default DriverRegistrationService;