import { Alert, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import RequestCard from '../../components/cards/RequestCard'
import BookTruckCard from '../../components/cards/BookTruckCard'
import { useNavigation } from '@react-navigation/native'
import BookingServices from '../../api/bookingServices'

const HomeScreen = () => {

    const navigation = useNavigation()

    const [bookingDetails, setBookingDetails] = useState([])

    const handleSubmit = () => {
        console.log("helo")
        // navigation.navigate("Find Load")
        Alert.alert("fetching your current location")
    }

    useEffect(() => {
        getBookings()
    }, [])


    const getBookings = async () => {
        const response = await BookingServices.getAllBookings();
        setBookingDetails(response.data)

    }

    return (
        <ImageBackground style={{ flex: 1, }} source={require("../../assets/mapbg.png")}>
            <ScrollView>
                <View style={{ margin: 10 }}>
                    <CustomButton mode='outlined' label="Update You Location" onPress={handleSubmit} />
                </View>
                <BookTruckCard bookingDetails={bookingDetails} title={"Want to find a load?"} />
                <RequestCard bookingDetails={bookingDetails} title={"Shipmemt Requests"} />
            </ScrollView>
        </ImageBackground>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        borderRadius: 10
    }
})