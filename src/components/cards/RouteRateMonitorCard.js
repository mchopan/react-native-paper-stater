import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { Colors } from '../../theme/colors'
import { textVariants } from '../../theme/styleVariants'


{/* <Text >Want to book a truck?</Text> */ }


const RouteRateMonitorCard = () => {
    return (
        <View style={{ margin: 10, padding: 10, backgroundColor: Colors.whiteBackground, borderRadius: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 15, fontWeight: "600", color: Colors.primary }}>Sgr to Jammu</Text>
                <Text style={{ fontFamily: "GothicA1-Regular", fontSize: 15, fontWeight: "600", color: Colors.primary }}>7000</Text>
            </View>
        </View >
    )
}

export default RouteRateMonitorCard

const styles = StyleSheet.create({})