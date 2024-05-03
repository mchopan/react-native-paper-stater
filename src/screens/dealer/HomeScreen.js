import { Alert, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import CustomButton from '../../components/CustomButton'
import ShipmentCard from '../../components/cards/ShipmentCard'
import RequestCard from '../../components/cards/RequestCard'
import BookTruckCard from '../../components/cards/BookTruckCard'
import ShipmemtRequestCard from '../../components/cards/ShipmemtRequestCard'

const HomeScreen = ({ navigation }) => {
    const theme = useTheme()

    const handleSubmit = () => {
        console.log("helo")
        // navigation.navigate("Find Load")
        Alert.alert("fetching your current location")
    }

    return (
        <ImageBackground style={{ flex: 1, }} source={require("../../assets/mapbg.png")}>
            <ScrollView>
                <View style={{ margin: 10 }}>
                    <CustomButton mode='outlined' label="Update You Location" onPress={handleSubmit} />
                </View>
                {/* <ShipmentCard /> */}
                <BookTruckCard navigation={navigation} title={"Want to find a load?"} />
                <RequestCard title={"Shipmemt Requests"} />
                {/* <ShipmemtRequestCard /> */}

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