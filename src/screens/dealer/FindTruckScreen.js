import { Alert, FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Colors } from '../../theme/colors'
import CustomButton from '../../components/CustomButton'
import SelectTruckCard from '../../components/cards/SelectTruckCard'
import BookingServices from '../../api/bookingServices'
import { MyContext } from '../../store/MyContext'
import Toast from 'react-native-toast-message'
import DriverRegistrationService from '../../api/driverRegistrationService'
const FindTruckScreen = ({ navigation }) => {

    const {
        dropLocation, pickUpLocation,
        date, vehicleType,
        goods,
        weight,
        paymentMode, user } = useContext(MyContext);


    const handleSubmit = () => {
        navigation.navigate("Booking Summary")
    }

    const [driversData, setDriversData] = useState([])
    const [filteredDrivers, setFilteredDrivers] = useState([])
    const [sortByDate, setSortByDate] = useState(false)
    const [filterByVehicle, setFilterByVehicle] = useState(false)

    const getAllDrivers = async () => {
        try {
            const response = await DriverRegistrationService.getAllDrivers();
            if (response.status == 200) {
                setDriversData(response.data.drivers)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllDrivers()
    }, [])

    useEffect(() => {
        // Apply filters whenever driversData changes or filters are toggled
        let result = [...driversData]

        if (sortByDate) {
            result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }

        if (filterByVehicle && vehicleType?.value) {
            result = result.filter(driver =>
                driver.vehicleType?.toLowerCase() === vehicleType.value.toLowerCase()
            )
        }

        setFilteredDrivers(result)
    }, [driversData, sortByDate, filterByVehicle, vehicleType])

    const handleDateSort = () => {
        setSortByDate(!sortByDate)
    }

    useEffect(() => {
        console.log(filteredDrivers, "filtered")
    }, [filteredDrivers])


    const handleVehicleFilter = () => {
        setFilterByVehicle(!filterByVehicle)
    }

    const handleBid = async (driverId) => {
        console.log(driverId, "driverId")
        try {
            const res = await BookingServices.createBooking({
                dealer: user._id,
                pickUpCityLocation: pickUpLocation,
                dropCityLocation: dropLocation,
                selectDate: date,
                selectVehicleType: vehicleType.value,
                selectGoodsType: goods.value,
                enterWeightKg: weight,
                advancePayment: paymentMode.value,
                dealerPhoneNumber: user.phoneNumber,
            })
            if (res.status == 201) {
                const data = {
                    dealerId: user._id,
                    driverId: driverId,
                    bookingId: res.data._id
                }
                const notificationResponse = await BookingServices.bidDriver(data)
                console.log(notificationResponse, "noti")
                Toast.show({
                    type: "success",
                    text1: "Notification Send Successfully"
                })
            }
            Alert.alert("request send to selected driver")
        } catch (error) {
            console.log(error, 'error')
        }
    }

    return (
        <ImageBackground style={{ flex: 1 }} source={require("../../assets/mapbg.png")}>
            <View style={{ margin: 10 }}>
                <View style={[styles.buttonContainer, {
                    backgroundColor: Colors.tertiary,
                }]}>
                    <CustomButton
                        direction='row'
                        mode={sortByDate ? 'contained' : 'outlined'}
                        label="Date Posted"
                        onPress={handleDateSort}
                    />
                    <CustomButton
                        direction='row'
                        mode={filterByVehicle ? 'contained' : 'outlined'}
                        label="Vehicle Type"
                        onPress={handleVehicleFilter}
                    />
                </View>
            </View>
            <FlatList
                data={filteredDrivers}
                renderItem={({ item }) => (
                    <SelectTruckCard driversData={item} navigation={navigation} onPress={() => handleBid(item._id)} />
                )}
            />
        </ImageBackground>
    )
}

export default FindTruckScreen

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        borderRadius: 10
    }
})