import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import PlainLine from './PlainLine'
import { capitalizeFirstLetter } from '../../../utils/captalize'

const BookingSummaryCard = ({ item }) => {
    const formatDisplayLocationName = (displayName) => {
        const displayName1 = capitalizeFirstLetter(displayName)
        const parts = displayName1.split(', ');
        return parts.slice(0, 1).join(', ');
    };
    return (
        <View style={styles.cardContainer}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10 }}>
                <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 14, fontWeight: "600", color: Colors.primary }}>{formatDisplayLocationName(item?.selectGoodsType)}</Text>
                <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 14, fontWeight: "700", color: Colors.primary }}>₹ 10196</Text>
            </View>
            <PlainLine />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, margin: 10 }}>
                <View>
                    <Image style={{ width: 100, height: 50 }} source={require("../../assets/truck1.png")} />
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
                </View>
            </View>
            <PlainLine />

            <View style={styles.innerCard}>
                <View style={styles.truckName}>
                    <Image style={{ width: 20, height: 20 }} source={require("../../assets/TruckWhite.png")} resizeMode='contain' />
                    <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 12, fontWeight: "600", color: "white" }}>{capitalizeFirstLetter(item?.selectVehicleType)}</Text>
                </View>
                {/* <View style={styles.truckName}>
                    <Image style={{ width: 20, height: 20 }} source={require("../../assets/speed.png")} resizeMode='contain' />
                    <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 12, fontWeight: "600", color: "white" }}>847 Km</Text>
                </View> */}
                <View style={styles.truckName}>
                    <Image style={{ width: 20, height: 20 }} source={require("../../assets/calendar.png")} resizeMode='contain' />
                    <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 12, fontWeight: "600", color: "white" }}>15-08-24</Text>
                </View>
            </View>
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