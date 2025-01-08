import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext';
import DealerRegistrationService from '../../api/dealerRegistrationService';
import DriverRegistrationService from '../../api/driverRegistrationService';
import Toast from 'react-native-toast-message';
import Loading from '../../components/Loading';

const ForgotPassword = ({ navigation }) => {
    const { userType } = useContext(UserTypeContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        newPassword: '',
        confirmPassword: '',
        otp: ''
    });
    const [otpSent, setOtpSent] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSendOTP = async () => {
        if (!formData.phoneNumber) {
            Toast.show({
                type: 'info',
                text1: 'Please enter your phone number',
            });
            return;
        }

        setIsLoading(true);
        try {
            const service = userType === USER_TYPES.DEALER
                ? DealerRegistrationService
                : DriverRegistrationService;

            const res = await service.sendOTP(formData.phoneNumber); // You'll need to create this endpoint
            if (res.status === 200) {
                setOtpSent(true);
                Toast.show({
                    type: 'success',
                    text1: 'OTP sent successfully',
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error sending OTP',
                text2: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!formData.otp || !formData.newPassword || !formData.confirmPassword) {
            Toast.show({
                type: 'info',
                text1: 'Please fill all fields',
            });
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Passwords do not match',
            });
            return;
        }

        setIsLoading(true);
        try {
            const service = userType === USER_TYPES.DEALER
                ? DealerRegistrationService
                : DriverRegistrationService;

            const res = await service.resetPassword(formData); // You'll need to create this endpoint
            if (res.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Password reset successfully',
                });
                navigation.navigate('Login');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error resetting password',
                text2: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Reset Password</Text>

                <CustomInput
                    keyboardType='phone-pad'
                    label="Mobile Number"
                    placeholder="Enter your mobile number"
                    onChangeText={(text) => handleInputChange('phoneNumber', text)}
                    value={formData.phoneNumber}
                    editable={!otpSent}
                    mode='outlined'
                    type='text'
                />

                {!otpSent ? (
                    <CustomButton
                        mode='contained'
                        label="Send OTP"
                        onPress={handleSendOTP}
                    />
                ) : (
                    <>
                        <CustomInput
                            keyboardType='number-pad'
                            label="OTP"
                            placeholder="Enter OTP"
                            onChangeText={(text) => handleInputChange('otp', text)}
                            value={formData.otp}
                            type='text'
                        />
                        <CustomInput
                            label="New Password"
                            placeholder="Enter new password"
                            onChangeText={(text) => handleInputChange('newPassword', text)}
                            value={formData.newPassword}
                            secureTextEntry
                            type='text'
                        />
                        <CustomInput
                            label="Confirm Password"
                            placeholder="Confirm new password"
                            onChangeText={(text) => handleInputChange('confirmPassword', text)}
                            value={formData.confirmPassword}
                            secureTextEntry
                            type='text'
                        />
                        <CustomButton
                            mode='contained'
                            label="Reset Password"
                            onPress={handleResetPassword}
                        />
                    </>
                )}
            </View>
            {isLoading && <Loading />}
        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.whiteBackground,
        padding: 20,
    },
    formContainer: {
        gap: 20,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 20,
    },
}); 