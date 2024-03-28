import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'
import { Colors } from '../theme/colors'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'

const Login = ({ navigation }) => {
    const theme = useTheme()

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        companyName: '',
        GSTNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Todo Handle form submission
        navigation.navigate("Menu Screen")
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/quickload-splash.png')} style={styles.logo} />
            </View>

            <View style={styles.overlay}>
                <View style={styles.mainFormContainer}>
                    <CustomInput
                        type='text'
                        label="Mobile Number"
                        placeholder="Enter your mobile number"
                        onChangeText={(text) => handleInputChange('phoneNumber', text)}
                        value={formData.phoneNumber}
                    />
                    <CustomInput
                        type='password'
                        label="Password"
                        placeholder="Enter your password"
                        onChangeText={(text) => handleInputChange('password', text)}
                        value={formData.password}
                        secureTextEntry={true}
                    />
                    <View style={styles.resendOtpContainer}>
                        <TouchableOpacity>
                            <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Login" onPress={handleSubmit} />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.whiteBackground,
        // backgroundColor: "#504444",
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