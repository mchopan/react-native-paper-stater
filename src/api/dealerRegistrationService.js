import axiosInstance from './axiosInstance';

class DealerRegistrationService {
    static async signUp(data) {
        console.log(data, "data to send")
        try {
            const response = await axiosInstance.post(`/register`, data);
            return response;
        } catch (error) {
            console.error('Signup Error:', error);
            throw error;
        }
    }

    static async login(data) {
        try {
            const response = await axiosInstance.post(`/login`, data);
            return response;
        } catch (error) {
            console.error('Signup Error:', error);
            throw error;
        }
    }
}

export default DealerRegistrationService;