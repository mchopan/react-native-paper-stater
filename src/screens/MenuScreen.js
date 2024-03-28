import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'
import { Colors } from '../theme/colors'
import CustomButton from '../components/CustomButton'
import CustomSelect from '../components/CustomSelect'
import indianCities from '../assets/indianCities.json'
import { textVariants } from '../theme/styleVariants'


const MenuScreen = ({ navigation }) => {
    const theme = useTheme()

    const cityOptions = Object.entries(indianCities).map(([cityName, cityData]) => ({
        label: cityName,
        value: cityData
    }));

    const [pickUpLocation, setPickUpLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');

    const handleSubmit = () => {
        // Todo Handle form submission
        navigation.navigate("Booking Details")
    };

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ flex: 1 }} source={require("../assets/mapbg.png")}>
                <View style={styles.overlay}>
                    <View style={styles.mainFormContainer}>
                        <Text style={textVariants.textSubHeading}>Book a Truck</Text>
                        <CustomSelect
                            mode='outlined'
                            placeholder='Pick Up City Location'
                            data={cityOptions}
                            search={true}
                            value={pickUpLocation}
                            onChange={(text) => { console.log(text, "pick"); setPickUpLocation(text) }
                            }
                        />
                        <CustomSelect
                            mode='outlined'
                            placeholder='Drop City Location'
                            data={cityOptions}
                            search={true}
                            value={dropLocation}
                            onChange={(text) => { console.log(text, "drop"); setDropLocation(text) }
                            }
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton mode='contained' label="Book Now" onPress={handleSubmit} />
                </View>
            </ImageBackground>
        </View>
    )
}

export default MenuScreen


const styles = StyleSheet.create({
    overlay: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        // justifyContent: "center"

    },
    mainFormContainer: {
        gap: 20,
        width: '90%',
        backgroundColor: Colors.secondary,
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
        backgroundColor: "white"
    },
    buttonContainer: {
        width: '100%',
        position: "absolute",
        bottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
})