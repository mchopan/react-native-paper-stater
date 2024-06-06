import { Alert, Image, Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Text } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import PlainLine from './PlainLine'
import { capitalizeFirstLetter } from '../../../utils/captalize'
import { useNavigation } from '@react-navigation/native'
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext'
import BookingServices from '../../api/bookingServices'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../Loading'
import { MyContext } from '../../store/MyContext'

const BookingSummaryCard = ({ item, pending }) => {

    const { userType } = useContext(UserTypeContext)
    const { user, setUser } = useContext(MyContext)

    const [isLoading, setIsLoading] = useState(false)

    const formatDisplayLocationName = (displayName) => {
        const displayName1 = capitalizeFirstLetter(displayName)
        const parts = displayName1.split(', ');
        return parts.slice(0, 1).join(', ');
    };


    const handCallPress = () => {
        if (userType == USER_TYPES.DEALER) {
            const phoneNumber = item?.driver?.phoneNumber;
            Linking.openURL(`tel:${phoneNumber}`);
        } else {
            const phoneNumber = item?.dealerPhoneNumber;
            Linking.openURL(`tel:${phoneNumber}`);
        }
    }

    const showCancelAlert = () => {
        Alert.alert(

            'Cancel Booking Confirmation',
            'Are you sure you want to cancel the booking?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Cancel Booking',
                    onPress: () => handleCancel(),
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    const showCompletAlert = () => {
        Alert.alert(

            'Complete Booking Confirmation',
            'Are you sure you want to complete the booking?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Complete Booking',
                    onPress: () => handleComplete(),
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    const handleComplete = async () => {
        try {
            setIsLoading(true)
            if (userType == USER_TYPES.DRIVER) {
                const bookingId = item._id
                const driverId = user._id
                const res = await BookingServices.bookingComplete(bookingId, driverId)
                const updatedUser = {
                    ...user,
                    active: false,
                };
                await AsyncStorage.setItem('driverData', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
            setIsLoading(false)
        } catch (error) {
            console.log("error in : completing ", error)
        }
    }

    const handleCancel = async () => {
        try {
            setIsLoading(true)
            if (userType == USER_TYPES.DRIVER) {
                const bookingId = item._id
                const driverId = user._id
                const res = await BookingServices.cancelBooking(bookingId, driverId)
                const updatedUser = {
                    ...user,
                    active: false,
                };
                await AsyncStorage.setItem('driverData', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.cardContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
                <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 14, fontWeight: "600", color: Colors.primary }}>{formatDisplayLocationName(item?.selectGoodsType)}</Text>
                <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 14, fontWeight: "700", color: Colors.primary }}>₹ 10196</Text>
            </View>
            <PlainLine />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, margin: 10 }}>
                <View>
                    {
                        item?.driver?.imageFile == undefined ? <Image tintColor={pending ? "default" : Colors.secondary} resizeMode='contain' style={{ width: 100, height: pending ? 50 : 100, borderRadius: 20 }} source={pending ? require("../../assets/truck1.png") : require("../../assets/noimage.png")} /> :
                            <Image resizeMode='cover' style={{ width: 100, height: pending ? 50 : 100, borderRadius: 20 }} source={pending ? require("../../assets/truck1.png") : { uri: item?.driver?.imageFile }} />
                    }
                </View>
                <View style={{ gap: 5 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <Image style={{ width: 15, height: 15 }} source={require("../../assets/MapPin.png")} resizeMode='contain' />
                        <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 14, fontWeight: "600", color: Colors.gray }}>{formatDisplayLocationName(item?.pickUpCityLocation)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <Image style={{ width: 13, height: 13 }} source={require("../../assets/MapPinLight.png")} resizeMode='contain' />
                        <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 14, fontWeight: "600", color: Colors.gray }}>{formatDisplayLocationName(item?.dropCityLocation)}</Text>
                    </View>
                    {
                        !pending && <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                            <Image tintColor={Colors.primary} style={{ width: 15, height: 15 }} source={require("../../assets/TruckWhite.png")} resizeMode='contain' />
                            <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 14, fontWeight: "600", color: Colors.gray }}>{formatDisplayLocationName(item?.driver?.vehicleRegistrationNumber)}</Text>
                        </View>
                    }
                </View>
            </View>
            <PlainLine />

            {
                item.status != "complete" && <View style={styles.innerCard}>
                    {
                        <TouchableOpacity disabled={userType == USER_TYPES.DEALER} onPress={showCancelAlert} style={styles.truckName}>
                            <Image style={{ width: 20, height: 20 }} source={require("../../assets/TruckWhite.png")} resizeMode='contain' />
                            <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 12, fontWeight: "600", color: "white" }}>Cancel</Text>
                        </TouchableOpacity>
                    }
                    {
                        !pending && <TouchableOpacity onPress={handCallPress} style={styles.truckName}>
                            <Image tintColor={"white"} style={{ width: 20, height: 20 }} source={require("../../assets/call.png")} resizeMode='contain' />
                            <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 12, fontWeight: "600", color: "white" }}>Call</Text>
                        </TouchableOpacity>
                    }
                    {
                        !pending && <TouchableOpacity disabled={userType == USER_TYPES.DEALER} onPress={showCompletAlert} style={styles.truckName}>
                            <Image style={{ width: 20, height: 20 }} source={require("../../assets/calendar.png")} resizeMode='contain' />
                            <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 12, fontWeight: "600", color: "white" }}>Complete</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
            {
                item.status == "complete" && !pending && <TouchableOpacity onPress={handCallPress} style={[styles.truckName, { borderRadius: 10, }]}>
                    <Image tintColor={"white"} style={{ width: 20, height: 20 }} source={require("../../assets/call.png")} resizeMode='contain' />
                    <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 12, fontWeight: "600", color: "white" }}>Call</Text>
                </TouchableOpacity>
            }
            {
                isLoading && <Loading />
            }
        </View>
    )
}

export default BookingSummaryCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.tertiary,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.20,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 20,
        elevation: 10,
    },
    innerCard: {
        // backgroundColor: "red",
        overflow: "hidden",
        gap: 2,
        flexDirection: "row",
        margin: 10,
        borderRadius: 10,
        justifyContent: "space-evenly",
    },
    truckName: {
        padding: 10,
        flex: 1,
        backgroundColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        justifyContent: "center"

    }
})