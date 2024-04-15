import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import { MyContext } from '../../store/MyContext'

const GenerateOtpScreen = ({ navigation, route }) => {


    const { userType } = useContext(UserTypeContext);
    const { phoneNumber, setPhoneNumber } = useContext(MyContext);

    const theme = useTheme()

    const [phoneNumberError, setPhoneNumberError] = useState('');


    const handleSubmit = () => {
        if (phoneNumber?.length !== 10) {
            setPhoneNumberError("please enter your phone number")
            return null
        }
        if (!!phoneNumber) {
            navigation.navigate("Verification")
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
                        onChangeText={(text) => {
                            setPhoneNumber(text)
                            if (text.length !== 10) {
                                setPhoneNumberError('Phone number must be 10 digits');
                            } else {
                                setPhoneNumberError('');
                            }
                        }}
                        value={phoneNumber}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Register" onPress={handleSubmit} />
            </View>
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