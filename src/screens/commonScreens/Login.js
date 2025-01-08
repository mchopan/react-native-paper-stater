import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import DealerRegistrationService from '../../api/dealerRegistrationService'
import Toast from 'react-native-toast-message';
import { MyContext } from '../../store/MyContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DriverRegistrationService from '../../api/driverRegistrationService'
import Loading from '../../components/Loading'
import messaging from '@react-native-firebase/messaging';



const Login = ({ navigation, route }) => {

    const [fcmToken, setFcmToken] = useState(null);

    useEffect(() => {
        messaging().getToken().then(token => {
            setFcmToken(token);
        });
    }, []);


    const { setIsAuthenticated } = React.useContext(MyContext);
    const { userType } = useContext(UserTypeContext);

    const theme = useTheme()

    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false)


    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (formData.phoneNumber == '' || formData.password == '') {
            Toast.show({
                type: 'info',
                text1: 'phone number & password are requird*',
            });
            return null
        }
        setIsLoading(true)
        if (userType == USER_TYPES.DEALER) {
            try {
                const res = await DealerRegistrationService.login(formData)
                if (res.status == 200) {
                    const dealerId = res.data.user._id
                    await DealerRegistrationService.updateDealerDeviceToken(dealerId, fcmToken)
                    await AsyncStorage.setItem('dealerData', JSON.stringify(res.data.user));
                    setIsAuthenticated(true)
                    Toast.show({
                        type: 'success',
                        text1: 'Login Successfully',
                    });
                    setIsLoading(false)
                    navigation.navigate("Menu Screen")
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error while login',
                    text2: `${error.message}`
                });
                setIsLoading(false)
            }
        }
        else {
            try {
                const res = await DriverRegistrationService.driverLogin(formData)
                if (res.status == 200) {
                    const driverId = res.data.user._id
                    if (res.data.user != null) {
                        await DriverRegistrationService.updateDeviceToken(driverId, fcmToken)
                        await AsyncStorage.setItem('driverData', JSON.stringify(res.data.user));
                    }
                    setIsAuthenticated(true)
                    Toast.show({
                        type: 'success',
                        text1: 'Login Successfully',
                    });
                    setIsLoading(false)
                    navigation.navigate("Driver Menu Screen")
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error while login',
                    text2: `${error.message}`
                });
                setIsLoading(false)
            }
        }
        setIsLoading(false)
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/quickload-splash.png')} style={styles.logo} />
            </View>

            <View style={styles.overlay}>
                <View style={styles.mainFormContainer}>
                    <CustomInput
                        keyboardType='phone-pad'
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

                    <View style={{ flexDirection: "row", gap: 5, }}>
                        <Text style={{ fontFamily: "GothicA1-Regular", color: Colors.gray, fontWeight: "400" }}>don't have an account yet?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register Number")}>
                            <Text style={{ fontFamily: "GothicA1-Regular", color: Colors.primary, fontWeight: "500" }}>Create One</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.resendOtpContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")}>
                            <Text style={{ fontFamily: "GothicA1-Regular", color: theme.colors.primary, fontWeight: "600" }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Login" onPress={handleSubmit} />
            </View>
            {
                isLoading && <Loading />
            }
        </View >
    )
}

export default Login

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