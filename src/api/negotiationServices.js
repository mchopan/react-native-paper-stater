import axiosInstance from './axiosInstance';

class NegotiationServices {
    static async createNegotiation(data) {
        console.log(data, "reaching here ")
        try {
            const response = await axiosInstance.post(`negotiations`, data);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async getAllNegotiationsByBookingId(bookingId) {
        try {
            const response = await axiosInstance.get(`negotiationsByBookingId/${bookingId}`);
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

    static async updateNegotiationStatus(id, status) {
        try {
            const response = await axiosInstance.put(`negotiations/${id}`, { status });
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
}

export default NegotiationServices;
