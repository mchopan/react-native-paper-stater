import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'
import CustomButton from '../../components/CustomButton'
import SelectLoadCard from '../../components/cards/SelectLoadCard'
import { useNavigation, useRoute } from '@react-navigation/native'

const FindLoadScreen = ({ }) => {

    const navigation = useNavigation()
    const route = useRoute()

    const { pickUpLocation, dropLocation, bookingDetails } = route.params

    console.log(pickUpLocation.value.city, dropLocation.value.city, "kakak")

    const handleSubmit = () => {
        navigation.navigate("Booking Summary")
    }



    return (
        <ImageBackground style={{ flex: 1 }} source={require("../../assets/mapbg.png")}>
            <View style={{ margin: 10 }}>
                <View style={[styles.buttonContainer, {
                    backgroundColor: Colors.tertiary,
                }]}>
                    <CustomButton direction='row' mode='contained' label="Date Posted" onPress={handleSubmit} />
                    <CustomButton direction='row' mode='contained' label="Vehicle Type" onPress={handleSubmit} />
                </View>
            </View>
            <FlatList
                data={bookingDetails.filter(item =>
                    item.pickUpCityLocation === pickUpLocation.value.city &&
                    item.dropCityLocation === dropLocation.value.city
                )}
                renderItem={({ item }) => (
                    <>
                        <SelectLoadCard item={item} navigation={navigation} />
                    </>
                )}
            />
        </ImageBackground>
    )
}

export default FindLoadScreen

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        borderRadius: 10
    }
})