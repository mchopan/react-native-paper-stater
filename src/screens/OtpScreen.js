import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { OtpInput } from "react-native-otp-entry";
import { Colors } from '../theme/colors';
import { useTheme } from 'react-native-paper';
import CustomButton from '../components/CustomButton';

const OtpScreen = ({ navigation }) => {

    const theme = useTheme()

    const handleSubmit = () => {
        console.log("handleVerify")
        // todo handle verify
        navigation.navigate("Login")
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/quickload-splash.png')} style={styles.logo} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>
                    Please enter the OTP
                </Text>
                <Text style={styles.message}>
                    We have sent a verification code to <Text style={[styles.message, { fontWeight: "600" }]}>+91-0123456789</Text>
                </Text>
            </View>
            <OtpInput
                numberOfDigits={4}
                focusColor={theme.colors.primary}
                focusStickBlinkingDuration={500}
                onTextChange={(text) => console.log(text)}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                theme={{
                    containerStyle: styles.container,
                    inputsContainerStyle: styles.inputsContainer,
                    pinCodeContainerStyle: styles.pinCodeContainer,
                    pinCodeTextStyle: styles.pinCodeText,
                    focusStickStyle: styles.focusStick,
                    focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }}
            />
            <View style={styles.resendOtpContainer}>
                <TouchableOpacity>
                    <Text style={{ color: theme.colors.primary }}>Didn’t get the OTP?</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ color: theme.colors.primary }}>Resent it(56s)</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Verify" onPress={handleSubmit} />
            </View>
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
        paddingHorizontal: 40
    },
    pinCodeContainer: {
        backgroundColor: "#9cb4cf78",
        borderColor: Colors.gray,
        width: 55,
        height: 65
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