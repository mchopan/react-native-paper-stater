import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import { MyContext } from '../../store/MyContext'
import OTPServices from '../../api/otpServices'
import Toast from 'react-native-toast-message'
import Loading from '../../components/Loading'

const GenerateOtpScreen = ({ navigation, route }) => {


    const { userType } = useContext(UserTypeContext);
    const { phoneNumber, setPhoneNumber } = useContext(MyContext);

    const theme = useTheme()

    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^[6-9]\d{9}$/;  // Indian phone number validation
        return phoneRegex.test(number);
    };

    const handlePhoneChange = (text) => {
        setPhoneNumber(text);
        if (!text) {
            setPhoneNumberError('Phone number is required');
        } else if (!validatePhoneNumber(text)) {
            setPhoneNumberError('Please enter a valid 10-digit phone number');
        } else {
            setPhoneNumberError('');
        }
    };

    const handleSubmit = async () => {
        if (!phoneNumber) {
            setPhoneNumberError("Phone number is required");
            return null;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setPhoneNumberError("Please enter a valid 10-digit phone number");
            return null;
        }

        setIsLoading(true);
        try {
            // First check if phone number exists
            const data = {
                phoneNumber,
                userType
            }
            const checkResponse = await OTPServices.checkPhoneExists(data);
            console.log(checkResponse, "checkResponse")
            if (checkResponse.exists) {
                Toast.show({
                    type: 'error',
                    text1: 'Phone number already registered',
                    text2: 'Please use a different number or login'
                });
                setIsLoading(false);
                return;
            }

            // If phone doesn't exist, proceed with OTP
            const response = await OTPServices.sendOTP({ phoneNumber });
            navigation.navigate("Verification", {
                sessionId: response.sessionId
            });
            Toast.show({
                type: 'success',
                text1: 'OTP sent successfully',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to send OTP',
                text2: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/quickload-splash.png')} style={styles.logo} />
            </View>

            <View style={styles.overlay}>
                <View style={styles.mainFormContainer}>
                    <CustomInput
                        maxLength={10}
                        hasError={!!phoneNumberError}
                        errorMessage={phoneNumberError}
                        type='text'
                        keyboardType='phone-pad'
                        label="Mobile Number"
                        placeholder="Enter your mobile number"
                        onChangeText={handlePhoneChange}
                        value={phoneNumber}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    mode='contained'
                    label="Register"
                    onPress={handleSubmit}
                    disabled={!!phoneNumberError || !phoneNumber}
                />
            </View>

            {isLoading && <Loading />}
        </View>
    )
}

export default GenerateOtpScreen

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.whiteBackground,
        flex: 1,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 200,
        resizeMode: 'center',
    },
    container: {
        paddingHorizontal: 40
    },
    pinCodeContainer: {
        backgroundColor: Colors.secondary,
        borderColor: "gray",
        width: 60,
        height: 70
    },
    pinCodeText: {
        color: Colors.primary
    },
    textStyle: {
        color: Colors.primary,
        fontWeight: "800",
        textAlign: "center",
    },
    message: {
        color: "gray",
        textAlign: "center",
        fontWeight: "400"
    },
    textContainer: {
        gap: 20,
        marginBottom: 20
    },
    resendOtpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignSelf: 'flex-end',
    },
    overlay: {
        gap: 100,
        marginBottom: 20,
        flex: 1,
        // backgroundColor: "red",
        width: '100%',
        alignItems: 'center',
        // justifyContent: "center"

    },
    mainFormContainer: {
        gap: 20,
        width: '90%',
        backgroundColor: Colors.whiteBackground,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    formContainer: {
        gap: 10,
        flexGrow: 1,
        paddingBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        position: "absolute",
        bottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
})