import axiosInstance from './axiosInstance';

class BookingServices {
    static async createBooking(data) {
        try {
            const response = await axiosInstance.post(`BookingCreate`, data);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async getAllBookings() {
        try {
            const response = await axiosInstance.get(`bookings`);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async getBookingById(id) {
        try {
            const response = await axiosInstance.get(`bookings/${id}`);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async bidDriver(data) {
        try {
            const response = await axiosInstance.post(`bidDriver`, data);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async driverResponse(data) {
        try {
            const response = await axiosInstance.post(`driverResponse`, data);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async bookingComplete(data) {
        try {
            const response = await axiosInstance.post(`bookingComplete`, data);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async sendPushNotificationsToDrivers(data) {
        try {
            const response = await axiosInstance.post(`sendPushNotificationsToDrivers`, data);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

export default BookingServices