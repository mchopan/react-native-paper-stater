import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomUpload from '../../components/CustomUpload';
import { MyContext } from '../../store/MyContext';
import DriverRegistrationService from '../../api/driverRegistrationService';
import Toast from 'react-native-toast-message';
import Loading from '../../components/Loading';
import messaging from '@react-native-firebase/messaging';

const DriverRegistration = ({ navigation }) => {

    const { phoneNumber, } = useContext(MyContext);

    const [isLoading, setIsLoading] = useState(false)

    const [fcmToken, setFcmToken] = useState(null);

    useEffect(() => {
        // Get the FCM token
        messaging().getToken().then(token => {
            setFcmToken(token);
        });
    }, []);


    const [formData, setFormData] = useState({
        name: '',
        address: '',
        vehicleType: '',
        drivingLicenseNumber: '',
        vehicleRegistrationNumber: '',
        password: '',
        confirmPassword: '',
        driverLicenseFile: null,
        vehicleRcFile: null,
        vehicleInsuranceFile: null,
        identityDocumentFile: null
    });

    const [errors, setErrors] = useState({
        nameError: '',
        addressError: '',
        vehicleTypeError: '',
        drivingLicenseNumberError: '',
        vehicleRegistrationNumberError: '',
        passwordError: '',
        confirmPasswordError: '',
        driverLicenseError: '',
        vehicleRcFileError: '',
        vehicleInsuranceFileError: '',
        identityDocumentFileError: ''
    });


    const [driverLicenseError, setDriverLicenseError] = useState(false)
    const [rcError, setRcError] = useState(false)
    const [insuranceError, setInsuranceError] = useState(false)
    const [identityError, setIdentityError] = useState(false)



    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
        switch (name) {
            case 'name':
                setErrors({ ...errors, nameError: value.trim() === '' ? 'Name is required' : '' }); // Check if the name is empty
                break;
            case 'address':
                setErrors({ ...errors, addressError: value.trim() === '' ? 'Address is required' : '' }); // Check if the address is empty
                break;
            case 'vehicleType':
                setErrors({ ...errors, vehicleTypeError: value.trim() === '' ? 'Vehicle type is required' : '' }); // Check if the vehicle type is empty
                break;
            case 'drivingLicenseNumber':
                setErrors({ ...errors, drivingLicenseNumberError: value.trim() === '' ? 'License number is required' : '' });
                break;
            case 'vehicleRegistrationNumber':
                setErrors({ ...errors, vehicleRegistrationNumberError: value.trim() === '' ? 'Registration number is required' : '' });
                break;
            case 'password':
                setErrors({ ...errors, passwordError: value.length < 6 ? 'Password must be at least 6 characters long' : '' }); // Check if the password length is less than 6 characters
                break;
            case 'confirmPassword':
                setErrors({ ...errors, confirmPasswordError: value !== formData.password ? 'Passwords do not match' : '' }); // Check if the confirm password matches the password
                break;
            default:
                break;
        }
    };

    const handleFileSelect = (file, type) => {
        // setFileNotSelected(true)
        setFormData({
            ...formData,
            [type]: file
        });
    };
    const handleSubmit = async () => {
        setIsLoading(true)
        const stringFields = [
            "name",
            "address",
            "vehicleType",
            "drivingLicenseNumber",
            "vehicleRegistrationNumber",
            "password",
            "confirmPassword"
        ];
        setRcError(false)
        setInsuranceError(false)
        setIdentityError(false)
        setDriverLicenseError(false)

        const isEmpty = stringFields.some(field => formData[field].trim() == '');

        if (isEmpty) {
            setIsLoading(false)
            Toast.show({
                type: 'info',
                text1: 'All Fields Are Required',
            });
            return
        }

        if (formData.vehicleRcFile == null) {
            setRcError(true)
            setIsLoading(false)
            return
        }

        if (formData.vehicleInsuranceFile == null) {
            setInsuranceError(true)
            setIsLoading(false)
            return
        }
        if (formData.identityDocumentFile == null) {
            setIdentityError(true)
            setIsLoading(false)
            return
        }
        if (formData.driverLicenseFile == null) {
            setDriverLicenseError(true)
            setIsLoading(false)
            return
        }

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
            formDataToSend.append('driverLicenseFile', formData.driverLicenseFile);
            formDataToSend.append('vehicleRcFile', formData.vehicleRcFile);
            formDataToSend.append('vehicleInsuranceFile', formData.vehicleInsuranceFile);
            formDataToSend.append('identityDocumentFile', formData.identityDocumentFile);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'device-token': fcmToken
                }
            };

            const res = await DriverRegistrationService.driverSignUp(formDataToSend, config);
            if (res.status == 201) {
                setIsLoading(false)
                Toast.show({
                    type: 'success',
                    text1: 'Account Created Successfully',
                });
                navigation.navigate("Login")
            }

        } catch (error) {
            console.log(error)
            setIsLoading(false)
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
                                hasError={!!errors.nameError}
                                errorMessage={errors.nameError}
                                type='text'
                                label="Name"
                                placeholder="Enter your name"
                                onChangeText={(text) => handleInputChange('name', text)}
                                value={formData.name}
                            />
                            <CustomInput
                                hasError={!!errors.addressError}
                                errorMessage={errors.addressError}
                                type='text'
                                label="Address"
                                placeholder="Enter your address"
                                onChangeText={(text) => handleInputChange('address', text)}
                                value={formData.address}
                            />
                            <CustomInput
                                hasError={!!errors.vehicleTypeError}
                                errorMessage={errors.vehicleTypeError}
                                type='text'
                                label="Vehicle Type"
                                placeholder="Enter your vehicle type"
                                onChangeText={(text) => handleInputChange('vehicleType', text)}
                                value={formData.vehicleType}
                            />
                            <CustomInput
                                hasError={!!errors.drivingLicenseNumberError}
                                errorMessage={errors.drivingLicenseNumberError}
                                type='text'
                                label="Driving License Number"
                                placeholder="Enter your license number"
                                onChangeText={(text) => handleInputChange('drivingLicenseNumber', text)}
                                value={formData.drivingLicenseNumber}
                            />
                            <CustomInput
                                hasError={!!errors.vehicleRegistrationNumberError}
                                errorMessage={errors.vehicleRegistrationNumberError}
                                type='text'
                                label="Vehicle Registration Number"
                                placeholder="Enter your registration number"
                                onChangeText={(text) => handleInputChange('vehicleRegistrationNumber', text)}
                                value={formData.vehicleRegistrationNumber}
                            />

                            <CustomUpload errorMessage={"Driver License is required*"} hasError={!!errors.driverLicenseError} fileNotSelected={driverLicenseError} label="Upload Driving License" onFileSelect={(file) => handleFileSelect(file, 'driverLicenseFile')} />

                            <CustomUpload errorMessage={"RC is required*"} hasError={!!errors.vehicleRcFileError} fileNotSelected={rcError} label="Upload Vehicle RC" onFileSelect={(file) => handleFileSelect(file, 'vehicleRcFile')} />

                            <CustomUpload errorMessage={"vehicle insurance is required*"} hasError={!!errors.vehicleInsuranceFileError} fileNotSelected={insuranceError} label="Upload Vehicle Insurance" onFileSelect={(file) => handleFileSelect(file, 'vehicleInsuranceFile')} />

                            <CustomUpload errorMessage={"identity document is required*"} hasError={!!errors.identityDocumentFileError} fileNotSelected={identityError} label="Upload Identity Document" onFileSelect={(file) => handleFileSelect(file, 'identityDocumentFile')} />

                            <CustomInput
                                hasError={!!errors.passwordError}
                                passwordErrorMassage={errors.passwordError}
                                type='password'
                                label="Password"
                                placeholder="Enter your password"
                                onChangeText={(text) => handleInputChange('password', text)}
                                value={formData.password}
                                secureTextEntry={true}
                            />
                            <CustomInput
                                hasError={!!errors.confirmPasswordError}
                                passwordErrorMassage={errors.confirmPasswordError}
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
            {
                isLoading && <Loading />
            }
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
