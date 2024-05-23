import React, { useContext } from 'react';
import { Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/CustomButton';
import API_BASE_URL from '../../api/apiConfig';
import { MyContext } from '../../store/MyContext';

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

const Payment = ({ label, amount }) => {

    const { user } = useContext(MyContext)
    console.log(user, "jajajajaajaaajajja")

    const handlePayment = async () => {
        try {
            amount = 1000;
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

            RazorpayCheckout.open(options).then((data) => {
                Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);
            }).catch((error) => {
                Alert.alert('Payment Failed', `Error: ${error.code} | ${error.description}`);
            });
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        // <TouchableOpacity >
        <CustomButton onPress={handlePayment} mode='contained' label={label} />
        // </TouchableOpacity>
    );
};

export default Payment;
