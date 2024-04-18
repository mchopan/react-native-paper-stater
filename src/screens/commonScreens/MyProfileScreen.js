import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { IconButton, Text, useTheme } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import CustomButton from '../../components/CustomButton'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import { MyContext } from '../../store/MyContext'
import { useNavigation } from '@react-navigation/native'
import DriverRegistrationService from '../../api/driverRegistrationService'
import DealerRegistrationService from '../../api/dealerRegistrationService'
import Toast from 'react-native-toast-message'
import Loading from '../../components/Loading'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DocumentPicker from 'react-native-document-picker';

const DealerProfile = ({ }) => {
    const navigation = useNavigation()
    const { user } = React.useContext(MyContext);



    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState(user.name || "");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
    const [companyName, setCompanyName] = useState(user.companyName || "");
    const [gstNumber, setGstNumber] = useState(user.gstNumber || "");
    const [imageUrl, setImageUrl] = useState(user?.imageFile || null)
    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const data = { name, phoneNumber, companyName, gstNumber };
            const res = await DealerRegistrationService.updateDealer(data, user._id)
            console.log(res.data, "updated successfully")
            if (res.status == 200) {
                await AsyncStorage.setItem('dealerData', JSON.stringify(res.data.dealer));
                Toast.show({
                    type: 'success',
                    text1: 'updated Successfully',
                });
                setIsLoading(false)
                // navigation.navigate("Menu Screen")
            }
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }
        setIsLoading(false)
        // console.log("login successfull : p")
        // navigation.navigate("Home Screen")
    }

    const handleAttach = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            const file = results[0];

            if (file) {
                setIsLoading(true)
                const formData = new FormData()
                formData.append('name', name)
                formData.append('phoneNumber', phoneNumber)
                formData.append('companyName', companyName)
                formData.append('gstNumber', gstNumber)
                formData.append('imageFile', file)

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                const res = await DealerRegistrationService.updateDealer(formData, user._id, config)
                if (res.status == 200) {
                    setImageUrl(res.data.dealer.imageFile)
                    await AsyncStorage.setItem('dealerData', JSON.stringify(res.data.dealer));
                    Toast.show({
                        type: 'success',
                        text1: 'profile updated',
                    });
                    setIsLoading(false)
                    // navigation.navigate("Menu Screen")
                }
            }
            setIsLoading(false)

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(err);
            } else {
                console.log(err);
            }
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.profile}>
                <View style={{
                    overflow: "hidden",
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                }}>
                    <Image style={{ position: "absolute", width: 130, height: 130 }} source={!imageUrl ? require('../../assets/profile.png') : { uri: imageUrl }} />
                </View>
                <IconButton
                    style={styles.iconStyles}
                    icon={require("../../assets/editIcon.png")}
                    size={20}
                    onPress={handleAttach}
                />
            </View>
            <View style={styles.overlay}>
                <ScrollView contentContainerStyle={styles.mainFormContainer}>
                    <CustomInput
                        type='text'
                        label="Name"
                        placeholder=""
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <CustomInput
                        type='text'
                        label="Phone Number"
                        placeholder=""
                        onChangeText={(text) => setPhoneNumber(text)}
                        value={phoneNumber}
                    />
                    <CustomInput
                        type='text'
                        label="Company Name"
                        placeholder=""
                        onChangeText={(text) => setCompanyName(text)}
                        value={companyName}
                    />
                    <CustomInput
                        type='text'
                        label="GST Number"
                        placeholder=""
                        onChangeText={(text) => setGstNumber(text)}
                        value={gstNumber}
                    />
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Update" onPress={handleSubmit} />
            </View>
            {
                isLoading && <Loading />
            }
        </View>
    )
}

const DriverProfile = ({ }) => {

    const navigation = useNavigation()

    const { user } = React.useContext(MyContext);

    const [name, setName] = useState(user.name || "");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
    const [address, setAddress] = useState(user.address || "");
    const [vehicleType, setVehicleType] = useState(user.vehicleType || "");
    const [driverLicenceNumber, setDriverLicenceNumber] = useState(user.drivingLicenseNumber || "")
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState(user.vehicleRegistrationNumber || "")
    const handleSubmit = () => {
        // todo handle update dealer 
        console.log("login successfull : p")
        navigation.navigate("Home Screen")
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.profile}>
                <View style={{
                    overflow: "hidden",
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                }}>
                    <Image style={{ position: "absolute", width: 130, height: 130 }} source={require("../../assets/profile.png")} />
                </View>
                <IconButton
                    style={styles.iconStyles}
                    icon={require("../../assets/editIcon.png")}
                    size={20}
                    onPress={() => console.log('chnage profile')}
                />
            </View>
            <View style={styles.overlay}>
                <ScrollView contentContainerStyle={styles.mainFormContainer}>
                    <CustomInput
                        type='text'
                        label="Name"
                        placeholder=""
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <CustomInput
                        type='text'
                        label="Phone Number"
                        placeholder=""
                        onChangeText={(text) => setPhoneNumber(text)}
                        value={phoneNumber}
                    />
                    <CustomInput
                        type='text'
                        label="Address"
                        placeholder=""
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                    />
                    <CustomInput
                        type='text'
                        label="Vehicle Type"
                        placeholder=""
                        onChangeText={(text) => setVehicleType(text)}
                        value={vehicleType}
                    />
                    <CustomInput
                        type='text'
                        label="Driving License Number"
                        placeholder=""
                        onChangeText={(text) => setDriverLicenceNumber(text)}
                        value={driverLicenceNumber}
                    />
                    <CustomInput
                        type='text'
                        label="Vehicle Registration Number"
                        placeholder=""
                        onChangeText={(text) => setVehicleRegistrationNumber(text)}
                        value={vehicleRegistrationNumber}
                    />
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Update" onPress={handleSubmit} />
            </View>
        </View>
    )
}


const MyProfileScreen = ({ navigation }) => {
    const { userType } = useContext(UserTypeContext)
    return (
        userType == USER_TYPES.DEALER ? <DealerProfile /> : <DriverProfile />
    )
}

export default MyProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center"
    },
    profile: {
        position: "relative",
        width: 120,
        height: 120,
        backgroundColor: "black",
        margin: 20,
        borderRadius: 60,
    },
    iconStyles: {
        backgroundColor: Colors.primary,
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        right: 0
    },
    overlay: {
        gap: 100,
        marginBottom: 60,
        padding: 10,
        flex: 1,
        width: '100%',
    },
    mainFormContainer: {
        gap: 20,
        alignSelf: "center",
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