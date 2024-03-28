import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const Registration = ({ navigation }) => {
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
        navigation.navigate("Verification")
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/quickload-splash.png')}
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
                                label="Company Name"
                                placeholder="Enter your company name"
                                onChangeText={(text) => handleInputChange('companyName', text)}
                                value={formData.companyName}
                            />
                            <CustomInput
                                type='text'
                                label="GST Number"
                                placeholder="Enter your GST number"
                                onChangeText={(text) => handleInputChange('GSTNumber', text)}
                                value={formData.GSTNumber}
                            />
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
        marginBottom: 20,
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
