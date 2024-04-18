import React, { useContext, useState } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { MyContext } from '../../store/MyContext';
import DealerRegistrationService from '../../api/dealerRegistrationService';
import Toast from 'react-native-toast-message';
import Loading from '../../components/Loading';

const Registration = ({ navigation }) => {

    const { phoneNumber } = useContext(MyContext);


    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        gstNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [gstNumberError, setGstNumberError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleInputChange = (name, value) => {
        if (name === 'gstNumber') {
            if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[A-Z\d]{1}$/.test(value)) {
                setGstNumberError("Invalid GST number format");
                setError(true)
            } else {
                setGstNumberError("");
                setError(false)

            }
        } else if (name === 'password' || name === 'confirmPassword') {
            if (name === 'confirmPassword' && value !== formData.password) {
                setPasswordError("Passwords do not match");
                setError(true)
            } else if (value.length < 6) {
                setPasswordError("Password must be at least 6 characters long");
            } else {
                setPasswordError("");
                setError(false)

            }
        }

        // Update form data
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async () => {
        if (formData.name == '' || formData.companyName == '' || formData.gstNumber == '') {
            Toast.show({
                type: 'info',
                text1: 'All fields are required',
            });
            return null
        }
        if (error) {
            Toast.show({
                type: 'info',
                text1: 'All fields are required',
            });
            return null
        }
        setIsLoading(true)
        try {
            const data = { ...formData, phoneNumber }
            const res = await DealerRegistrationService.signUp(data)
            console.log(res.data)
            if (res.status == 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Account Created Successfully',
                });
                setIsLoading(false)
                navigation.navigate("Login")
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `${error.message}`,
            });
            setIsLoading(false)
        }
        setIsLoading(false)
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/quickload-splash.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={styles.formContainer}>
                            <CustomInput
                                type='text'
                                label="Name"
                                placeholder="Enter your name"
                                onChangeText={(text) => handleInputChange('name', text)}
                                value={formData.name}
                            />
                            <CustomInput
                                type='text'
                                label="Company Name"
                                placeholder="Enter your company name"
                                onChangeText={(text) => handleInputChange('companyName', text)}
                                value={formData.companyName}
                            />
                            <CustomInput
                                type='text'
                                label="GST Number"
                                placeholder="Enter your GST number"
                                onChangeText={(text) => handleInputChange('gstNumber', text)}
                                value={formData.gstNumber}
                                maxLength={15}
                                hasError={!!gstNumberError} // Use phoneNumberError state to determine if there's an error
                                errorMessage={gstNumberError} // Pass error message to display

                            />
                            <CustomInput
                                type='password'
                                label="Password"
                                placeholder="Enter your password"
                                onChangeText={(text) => handleInputChange('password', text)}
                                value={formData.password}
                                secureTextEntry={true}
                                hasError={!!passwordError}
                                passwordErrorMassage={passwordError}

                            />
                            <CustomInput
                                type='password'
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                                value={formData.confirmPassword}
                                secureTextEntry={true}
                                hasError={!!passwordError}
                                passwordErrorMassage={passwordError}

                            />
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Register" onPress={handleSubmit} />
            </View>
            {
                isLoading && <Loading />
            }
        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    backgroundImage: {
        backgroundColor: Colors.whiteBackground,
        flex: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: "cover"
    },
    overlay: {
        gap: 100,
        marginTop: 50,
        marginBottom: 50,
        flex: 1,
        // backgroundColor: "red",
        width: '100%',
        alignItems: 'center',
        justifyContent: "center"

    },
    container: {
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
});
