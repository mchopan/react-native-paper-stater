import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BookingServices from '../../api/bookingServices'
import { FlatList } from 'react-native-gesture-handler'
import BookingSummaryCard from '../../components/cards/BookingSummaryCard'

const PendingScreen = () => {

    const [pendingData, setPendingData] = useState([])
    const getBookings = async () => {

        try {
            const response = await BookingServices.getAllBookings();
            const allBookings = response.data;
            const pendingBookings = allBookings.filter(item => item.status === "pending");
            setPendingData(pendingBookings);
        } catch (error) {
            console.log("error in pending screen", error)
        }
    }

    useEffect(() => {
        getBookings()
    }, [])



    return (
        <View style={{ flex: 1, justifyContent: "center", }}>
            {
                pendingData.length < 1 ? (<Image style={{ width: 200, height: 200, alignSelf: "center" }} resizeMode='contain' source={require("../../assets/noPending.png")} />)
                    : (
                        <FlatList
                            data={pendingData}
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

export default PendingScreen

const styles = StyleSheet.create({})