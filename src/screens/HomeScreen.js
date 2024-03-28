import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import CustomButton from '../components/CustomButton'
import ShipmentCard from '../components/cards/ShipmentCard'
import RequestCard from '../components/cards/RequestCard'
import BookTruckCard from '../components/cards/BookTruckCard'

const HomeScreen = () => {
    const theme = useTheme()

    const handleSubmit = () => {
        console.log("helo")
    }

    return (
        <ImageBackground style={{ flex: 1, }} source={require("../assets/mapbg.png")}>
            <ScrollView>
                <View style={{ margin: 10 }}>
                    <View style={[styles.buttonContainer, {
                        backgroundColor: theme.colors.tertiary,
                    }]}>
                        <CustomButton direction='row' mode='contained' label="Ongoing" onPress={handleSubmit} />
                        <CustomButton direction='row' mode='outlined' label="Upcoming" onPress={handleSubmit} />
                    </View>
                </View>
                <ShipmentCard />
                <RequestCard />
                <BookTruckCard />
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