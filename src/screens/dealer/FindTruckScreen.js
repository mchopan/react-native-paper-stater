import { Alert, FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '../../theme/colors'
import CustomButton from '../../components/CustomButton'
import SelectTruckCard from '../../components/cards/SelectTruckCard'
import BookingServices from '../../api/bookingServices'
import { MyContext } from '../../store/MyContext'
import Toast from 'react-native-toast-message'
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

    console.log(user, "kakaka")


    const handleBid = async () => {
        try {
            const res = await BookingServices.createBooking({
                pickUpCityLocation: pickUpLocation.value.city,
                dropCityLocation: dropLocation.value.city,
                selectDate: date,
                selectVehicleType: vehicleType.value,
                selectGoodsType: goods.value,
                enterWeightKg: weight,
                advancePayment: paymentMode.value,
            })
            console.log(res.status)
            if (res.status == 201) {
                const notificationResponse = await BookingServices.bidDriver(user._id, res.data._id, "663c562fb2ada5b2a0016945")
                console.log(notificationResponse, "noti")
                Toast.show({
                    type: "success",
                    text1: "notification send successfully"
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
                    <CustomButton direction='row' mode='contained' label="Date Posted" onPress={handleSubmit} />
                    <CustomButton direction='row' mode='contained' label="Vehicle Type" onPress={handleSubmit} />
                </View>
            </View>
            <FlatList data={[1, 2, 3, 4, 5]} renderItem={() => (
                <SelectTruckCard navigation={navigation} onPress={handleBid} />
            )} />
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