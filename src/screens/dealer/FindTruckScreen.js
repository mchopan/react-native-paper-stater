import { Alert, FlatList, ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'
import CustomButton from '../../components/CustomButton'
import SelectTruckCard from '../../components/cards/SelectTruckCard'
const FindTruckScreen = ({ navigation }) => {


    const handleSubmit = () => {
        console.log("helo")
        navigation.navigate("Booking Summary")
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
                <SelectTruckCard navigation={navigation} onPress={() => { Alert.alert("request send to selected driver") }} />
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