import { Image, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BookingServices from '../../api/bookingServices'
import { FlatList } from 'react-native-gesture-handler'
import BookingSummaryCard from '../../components/cards/BookingSummaryCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import { MyContext } from '../../store/MyContext'

const OngoingScreen = () => {


    const { userType } = useContext(UserTypeContext)
    const { user } = useContext(MyContext)

    const navigation = useNavigation()

    const [ongoingData, setOngoingData] = useState([])

    useFocusEffect(() => {
        navigation.setOptions({ title: 'Ongoing' }); // Set the tab name as screen title
    });

    const getBookings = async () => {
        try {
            if (userType == USER_TYPES.DEALER) {
                const response = await BookingServices.getBookingByDealerId(user._id);
                const allBookings = response.data;
                const ongoingBookings = allBookings.filter(item => item.status === "ongoing");
                setOngoingData(ongoingBookings);
            }
            else {
                const response = await BookingServices.getBookingByDriverId(user._id);
                const allBookings = response.data;
                const ongoingBookings = allBookings.filter(item => item.status === "ongoing");
                setOngoingData(ongoingBookings);
            }
        } catch (error) {
            console.log("error in ongoing screen", error)
        }
    }

    // const getUserDetailsById = async () => {
    //     try {
    //         if (userType == USER_TYPES.DRIVER){
    //             const response = await DriverRegistrationService.getDriverById()
    //         }
    //     } catch (error) {

    //     }
    // }


    useEffect(() => {
        getBookings()
    }, [])



    return (
        <View style={{ flex: 1, justifyContent: "center", }}>
            {
                ongoingData.length < 1 ? (<Image style={{ width: 200, height: 200, alignSelf: "center" }} resizeMode='contain' source={require("../../assets/noOngoing.png")} />)
                    : (
                        <FlatList
                            data={ongoingData?.reverse()}
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