import { Alert, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import RequestCard from '../../components/cards/RequestCard'
import BookTruckCard from '../../components/cards/BookTruckCard'
import { useNavigation } from '@react-navigation/native'
import BookingServices from '../../api/bookingServices'
import Geolocation from '@react-native-community/geolocation';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import Loading from '../../components/Loading'



const HomeScreen = () => {

    const navigation = useNavigation()

    const [bookingDetails, setBookingDetails] = useState([])
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdateLocation = () => {
        getCurrentLocation();
    }

    useEffect(() => {
        getBookings()
    }, [])


    const getBookings = async () => {
        const response = await BookingServices.getAllBookings();
        const allBookings = response.data;
        const pendingBookings = allBookings.filter(item => item.status === "pending");
        setBookingDetails(pendingBookings);
    }
    const getCurrentLocation = () => {
        setIsLoading(true);
        Geolocation.getCurrentPosition(
            position => {
                setIsLoading(false);
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
                console.log("Current Location", `Latitude: ${latitude}, Longitude: ${longitude}`);
            },
            error => {
                setIsLoading(false);
                if (error.code === 2) {

                    promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                        .then(data => {
                            console.log("GPS enabled", data);
                        })
                        .catch(err => {
                            console.error("Failed to enable GPS", err);
                        });
                } else {
                    console.error("Error getting location", error);
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };


    return (
        <ImageBackground style={{ flex: 1 }} source={require("../../assets/mapbg.png")}>
            <ScrollView>
                <View style={{ margin: 10 }}>
                    <CustomButton icon={require("../../assets/MapPinLight.png")} mode='outlined' label={isLoading ? " Updating..." : "Update Your Location"} onPress={handleUpdateLocation} />
                    {/* {
                        isLoading && <Loading />
                    } */}
                </View>
                <BookTruckCard bookingDetails={bookingDetails} title={"Want to find a load?"} />
                <RequestCard bookingDetails={bookingDetails} title={"Shipment Requests"} />
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
