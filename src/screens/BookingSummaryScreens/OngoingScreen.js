import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BookingServices from '../../api/bookingServices'
import { FlatList } from 'react-native-gesture-handler'
import BookingSummaryCard from '../../components/cards/BookingSummaryCard'

const OngoingScreen = () => {

    const [ongoingData, setOngoingData] = useState([])
    const getBookings = async () => {
        try {
            const response = await BookingServices.getAllBookings();
            const allBookings = response.data;
            const ongoingBookings = allBookings.filter(item => item.status === "ongoing");
            setOngoingData(ongoingBookings);
        } catch (error) {
            console.log("error in ongoing screen", error)
        }
    }

    useEffect(() => {
        getBookings()
    }, [])



    return (
        <View style={{ flex: 1, justifyContent: "center", }}>
            {
                ongoingData.length < 1 ? (<Image style={{ width: 200, height: 200, alignSelf: "center" }} resizeMode='contain' source={require("../../assets/noOngoing.png")} />)
                    : (
                        <FlatList
                            data={ongoingData}
                            renderItem={({ item }) => {
                                return (
                                    <BookingSummaryCard item={item} />
                                )
                            }}
                        />
                    )
            }
        </View>
    )
}

export default OngoingScreen

const styles = StyleSheet.create({})