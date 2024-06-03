import { Image, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BookingServices from '../../api/bookingServices'
import { FlatList } from 'react-native-gesture-handler'
import BookingSummaryCard from '../../components/cards/BookingSummaryCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import { MyContext } from '../../store/MyContext'

const CompletedScreen = () => {

    const { userType } = useContext(UserTypeContext)
    const { user } = useContext(MyContext)

    const [complatedData, setComplatedData] = useState([])

    const getBookings = async () => {
        try {
            if (userType == USER_TYPES.DEALER) {
                const response = await BookingServices.getBookingByDealerId(user._id);
                const allBookings = response.data;
                const complateBookings = allBookings.filter(item => item.status === "complete");
                setComplatedData(complateBookings);
            }
            else {
                const response = await BookingServices.getBookingByDriverId(user._id);
                const allBookings = response.data;
                const complateBookings = allBookings.filter(item => item.status === "complete");
                setComplatedData(complateBookings);
            }
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
                complatedData.length < 1 ? (<Image style={{ width: 200, height: 200, alignSelf: "center" }} resizeMode='contain' source={require("../../assets/noCompleted.png")} />)
                    : (
                        <FlatList
                            data={complatedData?.reverse()}
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

export default CompletedScreen

const styles = StyleSheet.create({})