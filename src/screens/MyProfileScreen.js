import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput'
import { IconButton, Text, useTheme } from 'react-native-paper'
import { Colors } from '../theme/colors'
import CustomButton from '../components/CustomButton'

const MyProfileScreen = ({ navigation }) => {

    const theme = useTheme()

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [GSTNumber, setGSTNumber] = useState("");

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
                    <Image style={{ position: "absolute", width: 130, height: 130 }} source={require("../assets/profile.png")} />
                </View>
                <IconButton
                    style={styles.iconStyles}
                    icon={require("../assets/editIcon.png")}
                    size={20}
                    onPress={() => console.log('chnage profile')}
                />
            </View>
            <View style={styles.overlay}>
                <View style={styles.mainFormContainer}>
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
                        onChangeText={(text) => setGSTNumber(text)}
                        value={GSTNumber}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton mode='contained' label="Update" onPress={handleSubmit} />
            </View>
        </View>
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
        marginBottom: 20,
        flex: 1,
        width: '100%',
        alignItems: 'center',

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