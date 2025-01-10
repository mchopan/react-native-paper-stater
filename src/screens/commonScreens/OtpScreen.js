import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { OtpInput } from "react-native-otp-entry";
import { Colors } from '../../theme/colors';
import { useTheme } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext';
import { MyContext } from '../../store/MyContext';
import OTPServices from '../../api/otpServices';
import Toast from 'react-native-toast-message';
import Loading from '../../components/Loading';

const OtpScreen = ({ navigation, route }) => {
    const { userType } = useContext(UserTypeContext);
    const { phoneNumber } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const { sessionId } = route.params || {};

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResendOTP = async () => {
        if (timer > 0) return;
        setIsLoading(true);
        try {
            const response = await OTPServices.sendOTP({ phoneNumber });
            setTimer(60);
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

    const handleSubmit = async () => {
        if (otp.length !== 6) {
            Toast.show({
                type: 'info',
                text1: 'Please enter complete OTP',
            });
            return;
        }

        setIsLoading(true);
        try {
            await OTPServices.verifyOTP({
                sessionId,
                otp
            });

            if (userType == USER_TYPES.DRIVER) {
                navigation.navigate("Driver Registration");
            } else {
                navigation.navigate("Registration");
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
                text2: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    const theme = useTheme()

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/quickload-splash.png')} style={styles.logo} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                    Please enter the OTP
                </Text>
                <Text style={styles.message}>
                    We have sent a verification code to <Text style={[styles.message, { fontWeight: "600" }]}>+91-{phoneNumber}</Text>
                </Text>
            </View>
            <OtpInput
                numberOfDigits={6}
                focusColor={theme.colors.primary}
                focusStickBlinkingDuration={500}
                onTextChange={(text) => setOtp(text)}
                onFilled={(text) => setOtp(text)}
                theme={{
                    containerStyle: styles.container,
                    inputsContainerStyle: styles.inputsContainer,
                    pinCodeContainerStyle: {
                        ...styles.pinCodeContainer,
                        width: 45,
                        height: 55
                    },
                    pinCodeTextStyle: styles.pinCodeText,
                    focusStickStyle: styles.focusStick,
                    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }}
            />
            <View style={styles.resendOtpContainer}>
                <TouchableOpacity>
                    <Text style={{ color: theme.colors.primary }}>Didn't get the OTP?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleResendOTP} disabled={timer > 0}>
                    <Text style={{
                        color: timer > 0 ? Colors.gray : theme.colors.primary
                    }}>
                        Resend {timer > 0 ? `(${timer}s)` : ''}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    mode='contained'
                    label="Verify"
                    onPress={handleSubmit}
                />
            </View>
            {isLoading && <Loading />}
        </View>
    )
}

export default OtpScreen

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
        paddingHorizontal: 20
    },
    pinCodeContainer: {
        backgroundColor: "#9cb4cf78",
        borderColor: Colors.gray,
        width: 45,
        height: 55
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
        color: Colors.gray,
        textAlign: "center",
        fontWeight: "400"
    },
    textContainer: {
        gap: 20,
        marginBottom: 20
    },
    buttonContainer: {
        width: '100%',
        position: "absolute",
        bottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    resendOtpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 30


    }
})