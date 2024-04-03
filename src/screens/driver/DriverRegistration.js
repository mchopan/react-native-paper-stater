import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import DocumentPicker from 'react-native-document-picker';
import { Button } from 'react-native-paper';
import CustomUpload from '../../components/CustomUpload';

const DriverRegistration = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        vehicleType: '',
        licenseNumber: '',
        registrationNumber: '',
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
        navigation.setParams({ isDealer: false });
        navigation.navigate("Verification")
    };

    // Function to handle attachment selection
    const handleAttach = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            const file = results[0];
            setSelectedFile(file)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(err)
            }
            else {
                console.log(err)
            }
        }
    }

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
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                onChangeText={(text) => handleInputChange('phoneNumber', text)}
                                value={formData.phoneNumber}
                                keyboardType="phone-pad"
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
                            <CustomUpload label="Upload Vehicle RC" />
                            <CustomUpload label="Upload Vehicle Insurance" />
                            <CustomUpload label="Upload Identity Document" />
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
