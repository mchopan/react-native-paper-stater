import { FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import CustomButton from '../../components/CustomButton'
import CustomSelect from '../../components/CustomSelect'
import indianCities from '../../assets/indianCities.json'
import { textVariants } from '../../theme/styleVariants'
import RouteRateMonitorCard from '../../components/cards/RouteRateMonitorCard'
import Card from '../../components/cards/Card'
import RequestCard from '../../components/cards/RequestCard'
import { MyContext } from '../../store/MyContext'
import Toast from 'react-native-toast-message'
import LocationAutocomplete from '../../components/AutoCompleteLocation'
import CustomInput from '../../components/CustomInput'


const MenuScreen = ({ navigation }) => {
    const theme = useTheme()

    const cityOptions = Object.entries(indianCities).map(([cityName, cityData]) => ({
        label: cityName,
        value: cityData
    }));

    const { dropLocation, pickUpLocation, setPickUpLocation, setDropLocation } = useContext(MyContext);


    const handleSubmit = () => {
        // Todo Handle form submission
        if (pickUpLocation == "" || dropLocation == "") {
            Toast.show({
                type: 'error',
                text1: `${'Please select pickup and drop location'}`,
            });
            return
        }
        navigation.navigate("Booking Details")
    };

    return (
        <ImageBackground style={{ flex: 1 }} source={require("../../assets/mapbg.png")}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.overlay}>
                    <View style={styles.mainFormContainer}>
                        <Text style={[textVariants.textSubHeading, { color: Colors.primary }]}>Want to book a truck?</Text>
                        {/* <LocationAutocomplete
                            value={pickUpLocation}
                            onChange={(text) => setPickUpLocation(text)}
                            placeholder="Pick Up City Location"
                        /> */}
                        {/* <LocationAutocomplete
                            value={dropLocation}
                            onChange={(text) => setDropLocation(text)}
                            placeholder="Drop City Location"
                        /> */}

                        <CustomInput
                            type='text'
                            keyboardType='default'
                            label='Pick Up City Loaction'
                            value={pickUpLocation}
                            onChangeText={(text) => setPickUpLocation(text)}
                        />
                        <CustomInput
                            type='text'
                            keyboardType='default'
                            label='Drop City Location'
                            value={dropLocation}
                            onChangeText={(text) => setDropLocation(text)}
                        />

                        <CustomButton mode='contained' label="Next" onPress={handleSubmit} />
                    </View>
                </View>
                <View style={{ flex: 1, margin: 10 }}>
                    <Card overflow={"hidden"} flex={1} padding={20}>
                        <Text style={[textVariants.textSubHeading, { color: Colors.primary }]}>Route Rate Monitor</Text>
                        <FlatList
                            nestedScrollEnabled
                            style={{ height: 200 }}
                            data={[1, 2, 3, 4, 5, 6, 7]}
                            renderItem={({ item }) => <RouteRateMonitorCard />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </Card>
                    <RequestCard title={"Requests"} />
                </View>

            </ScrollView>
        </ImageBackground>
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
        borderColor: Colors.gray,
        borderWidth: 1,
        gap: 20,
        width: '90%',
        backgroundColor: Colors.tertiary,
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
    cardHeader: {
        position: "static"
    }
})