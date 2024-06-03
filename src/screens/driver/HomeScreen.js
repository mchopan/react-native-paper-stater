import { Alert, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton';
import RequestCard from '../../components/cards/RequestCard';
import BookTruckCard from '../../components/cards/BookTruckCard';
import { useNavigation } from '@react-navigation/native';
import BookingServices from '../../api/bookingServices';
import Geolocation from '@react-native-community/geolocation';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import axios from 'axios';
import { MyContext } from '../../store/MyContext';

const HomeScreen = () => {

    const navigation = useNavigation();

    // const { currentPlace, setCurrentPlace } = useContext(MyContext)

    const [bookingDetails, setBookingDetails] = useState([]);
    // const [currentLocation, setCurrentLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // const handleUpdateLocation = () => {
    //     getCurrentLocation();
    // };

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = async () => {
        setIsLoading(true)
        try {
            const response = await BookingServices.getAllBookings();
            const allBookings = response.data;
            const pendingBookings = allBookings.filter(item => item.status === "pending");
            setBookingDetails(pendingBookings);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log("driver", error)
        }
        setIsLoading(false)
    };

    // const getCurrentLocation = () => {
    //     setIsLoading(true);
    //     Geolocation.getCurrentPosition(
    //         position => {
    //             setIsLoading(false);
    //             const { latitude, longitude } = position.coords;
    //             setCurrentLocation({ latitude, longitude });
    //             console.log("Current Location", `Latitude: ${latitude}, Longitude: ${longitude}`);
    //             getPlaceName(latitude, longitude);
    //         },
    //         error => {
    //             setIsLoading(false);
    //             if (error.code === 2) {
    //                 promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
    //                     .then(data => {
    //                         console.log("GPS enabled", data);
    //                     })
    //                     .catch(err => {
    //                         console.error("Failed to enable GPS", err);
    //                     });
    //             } else {
    //                 console.error("Error getting location", error);
    //             }
    //         },
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 1 }
    //     );
    // };

    // const getPlaceName = async (latitude, longitude) => {
    //     try {
    //         const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
    //             params: {
    //                 lat: latitude,
    //                 lon: longitude,
    //                 format: 'json'
    //             }
    //         });
    //         const placeName = response.data.display_name;
    //         setCurrentPlace(placeName);
    //     } catch (error) {
    //         console.error("Error fetching place name", error);
    //     }
    // };

    return (
        <ImageBackground style={{ flex: 1 }} source={require("../../assets/mapbg.png")}>
            <ScrollView>
                {/* <View style={{ margin: 10 }}>
                    <CustomButton icon={require("../../assets/MapPinLight.png")} mode='outlined' label={isLoading ? " Updating..." : "Update Your Location"} onPress={handleUpdateLocation} />
                </View> */}
                <BookTruckCard bookingDetails={bookingDetails} title={"Want to find a load?"} />
                <RequestCard isLoading={isLoading} bookingDetails={bookingDetails} title={"Shipment Requests"} />
            </ScrollView>
        </ImageBackground>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        borderRadius: 10
    }
});
