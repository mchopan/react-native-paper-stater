import React, { useContext, useState } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomUpload from '../../components/CustomUpload';
import { MyContext } from '../../store/MyContext';
import DriverRegistrationService from '../../api/driverRegistrationService';
import Toast from 'react-native-toast-message';
import Spacer from '../../components/Spacer';

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

    const [errors, setErrors] = useState({
        nameError: '',
        addressError: '',
        vehicleTypeError: '',
        drivingLicenseNumberError: '',
        vehicleRegistrationNumberError: '',
        passwordError: '',
        confirmPasswordError: '',
        vehicleRcFileError: '',
        vehicleInsuranceFileError: '',
        identityDocumentFileError: ''
    });

    const [fileNotSelected, setFileNotSelected] = useState(false)



    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });

        console.log(name, "field")

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
            case 'licenseNumber':
                setErrors({ ...errors, drivingLicenseNumberError: value.trim() === '' ? 'License number is required' : '' });
                break;
            case 'registrationNumber':
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

    const handleFileSelect = (file, type) => { // Callback to update state with selected file
        // setFileNotSelected(true)
        setFormData({
            ...formData,
            [type]: file
        });
    };
    const handleSubmit = async () => {
        const stringFields = [
            "name",
            "address",
            "vehicleType",
            "licenseNumber",
            "registrationNumber",
            "password",
            "confirmPassword"
        ];

        const isEmpty = stringFields.some(field => formData[field].trim() === '');

        const isFileEmpty = Object.values(formData).some(value => value === null && typeof value !== 'string'); // Check if the value is null and not a string

        console.log(isEmpty, "&&", isFileEmpty)

        if (isEmpty) {
            Toast.show({
                type: 'info',
                text1: 'all fields are required',
            });
            return
        }
        setFileNotSelected(false)
        if (isFileEmpty) {
            setFileNotSelected(true)
            Toast.show({
                type: 'info',
                text1: 'documents fields are required',
            });
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
                                onChangeText={(text) => handleInputChange('licenseNumber', text)}
                                value={formData.licenseNumber}
                            />
                            <CustomInput
                                hasError={!!errors.vehicleTypeError}
                                errorMessage={errors.vehicleTypeError}
                                type='text'
                                label="Vehicle Registration Number"
                                placeholder="Enter your registration number"
                                onChangeText={(text) => handleInputChange('registrationNumber', text)}
                                value={formData.registrationNumber}
                            />

                            <CustomUpload errorMessage={"please select the vehicle Rc document"} hasError={!!errors.vehicleRcFileError} fileNotSelected={fileNotSelected} label="Upload Vehicle RC" onFileSelect={(file) => handleFileSelect(file, 'vehicleRcFile')} />

                            <CustomUpload errorMessage={"please select the vehicle insurance document"} hasError={!!errors.vehicleInsuranceFileError} fileNotSelected={fileNotSelected} label="Upload Vehicle Insurance" onFileSelect={(file) => handleFileSelect(file, 'vehicleInsuranceFile')} />

                            <CustomUpload errorMessage={"please select the identity document document"} hasError={!!errors.identityDocumentFileError} fileNotSelected={fileNotSelected} label="Upload Identity Document" onFileSelect={(file) => handleFileSelect(file, 'identityDocumentFile')} />

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
