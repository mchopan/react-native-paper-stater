import React, { useContext, useState } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomUpload from '../../components/CustomUpload';
import { MyContext } from '../../store/MyContext';
import DriverRegistrationService from '../../api/driverRegistrationService';
import Toast from 'react-native-toast-message';

const DriverRegistration = ({ navigation }) => {

    const { phoneNumber, } = useContext(MyContext);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        vehicleType: '',
        drivingLicenseNumber: '',
        vehicleRegistrationNumber: '',
        password: '',
        confirmPassword: '',
        vehicleRcFile: null,
        vehicleInsuranceFile: null,
        identityDocumentFile: null
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileSelect = (file, type) => { // Callback to update state with selected file
        setFormData({
            ...formData,
            [type]: file
        });
    };
    const handleSubmit = async () => {
        try {

            const formDataToSend = new FormData();
            formDataToSend.append('phoneNumber', phoneNumber);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('vehicleType', formData.vehicleType);
            formDataToSend.append('drivingLicenseNumber', formData.drivingLicenseNumber);
            formDataToSend.append('vehicleRegistrationNumber', formData.vehicleRegistrationNumber);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('confirmPassword', formData.confirmPassword);
            formDataToSend.append('vehicleRcFile', formData.vehicleRcFile);
            formDataToSend.append('vehicleInsuranceFile', formData.vehicleInsuranceFile);
            formDataToSend.append('identityDocumentFile', formData.identityDocumentFile);

            console.log(formDataToSend, "formData")

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const res = await DriverRegistrationService.driverSignUp(formDataToSend, config);
            if (res.status == 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Account Created Successfully',
                });
                navigation.navigate("Login")
            }

        } catch (error) {
            console.log(error.message)
            Toast.show({
                type: 'error',
                text1: 'Error while creating account',
                text2: `${error.message}`,
            });
        }
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
                                label="Address"
                                placeholder="Enter your address"
                                onChangeText={(text) => handleInputChange('address', text)}
                                value={formData.address}
                            />
                            <CustomInput
                                type='text'
                                label="Vehicle Type"
                                placeholder="Enter your vehicle type"
                                onChangeText={(text) => handleInputChange('vehicleType', text)}
                                value={formData.vehicleType}
                            />
                            <CustomInput
                                type='text'
                                label="Driving License Number"
                                placeholder="Enter your license number"
                                onChangeText={(text) => handleInputChange('licenseNumber', text)}
                                value={formData.licenseNumber}
                            />
                            <CustomInput
                                type='text'
                                label="Vehicle Registration Number"
                                placeholder="Enter your registration number"
                                onChangeText={(text) => handleInputChange('registrationNumber', text)}
                                value={formData.registrationNumber}
                            />

                            <CustomUpload label="Upload Vehicle RC" onFileSelect={(file) => handleFileSelect(file, 'vehicleRcFile')} />
                            <CustomUpload label="Upload Vehicle Insurance" onFileSelect={(file) => handleFileSelect(file, 'vehicleInsuranceFile')} />
                            <CustomUpload label="Upload Identity Document" onFileSelect={(file) => handleFileSelect(file, 'identityDocumentFile')} />

                            <CustomInput
                                type='password'
                                label="Password"
                                placeholder="Enter your password"
                                onChangeText={(text) => handleInputChange('password', text)}
                                value={formData.password}
                                secureTextEntry={true}
                            />
                            <CustomInput
                                type='password'
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                                value={formData.confirmPassword}
                                secureTextEntry={true}
                            />
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Register" onPress={handleSubmit} />
            </View>
        </View>
    );
};

export default DriverRegistration;

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
        marginTop: 150,
        gap: 100,
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
