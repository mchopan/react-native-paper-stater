import React, { useContext } from 'react';
import { Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';
import API_BASE_URL from '../../api/apiConfig';
import { MyContext } from '../../store/MyContext';
import Toast from 'react-native-toast-message';
import BookingServices from '../../api/bookingServices';
import { useNavigation } from '@react-navigation/native';
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PdfFiles from './PdfFiles';
import GeneratePdf, { createPDF } from './GeneratePdf';

const fetchOrderId = async (amount) => {
    try {
        const response = await fetch(`${API_BASE_URL}create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                currency: 'INR',
                receipt: 'helloThere'
            }),
        });

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create order');
    }
};

const Payment = ({ label, amount, item }) => {


    const { user, setUser, setPaymentData, paymentData } = useContext(MyContext)
    const { userType } = useContext(UserTypeContext)

    const navigation = useNavigation()

    console.log(item, "item-----------")

    const updateBookingDetails = async () => {
        try {
            const bookingId = item._id
            const driverId = user._id
            const data = { driverId, bookingId, response: 'accept' }
            const res = await BookingServices.driverResponse(data)
            if (userType == USER_TYPES.DRIVER) {
                const updatedUser = {
                    ...user,
                    active: true,
                };
                await AsyncStorage.setItem('driverData', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
            const resData = res.data
            await createPDF({ resData, user, loadDetails: item, setFilePath: (path) => console.log('PDF saved at:', path) });
            navigation.navigate("Pdf Files")
        } catch (error) {
            console.log(error, "error")
        }
    }

    const handlePayment = async () => {
        try {
            amount = 1000 * 100;
            const orderId = await fetchOrderId(amount);

            const options = {
                description: 'Credits towards consultation',
                image: user?.imageFile,
                currency: 'INR',
                key: 'rzp_test_jANGyc1nEDliGS', // Use your public key ID here
                amount: amount * 100, // amount in paise
                name: "Quickload",
                order_id: orderId, // use the order ID from your server
                prefill: {
                    email: '',
                    contact: user?.phoneNumber,
                    name: user?.name,
                },
                theme: { color: Colors.primary }
            };

            RazorpayCheckout.open(options).then(async (data) => {
                Toast.show({
                    type: 'success',
                    text1: 'Payment Successful',
                    text2: `Payment ID: ${data.razorpay_payment_id}`
                })
                await updateBookingDetails()
            }).catch((error) => {
                Toast.show({
                    type: 'error',
                    text1: 'Payment Failed',
                    text2: `Error: ${error.code} | ${error.description}`
                })
                console.log(error, "razorpay error")
                // setPaymentData(error)
            });
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <CustomButton onPress={handlePayment} mode='contained' label={label} />
    );
};

export default Payment;
