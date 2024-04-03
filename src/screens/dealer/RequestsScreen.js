import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ShipmemtRequestCard from '../../components/cards/ShipmemtRequestCard'
import CustomButton from '../../components/CustomButton'

const RequestsScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, }}>
            <View style={{ alignItems: "center", }}>
                <Image style={{ height: 200, width: 200 }} source={require("../../assets/marker.png")} />
            </View>
            <View style={{ marginTop: 20 }}>
                <ShipmemtRequestCard />
            </View>

            <View style={{ padding: 10, gap: 10, position: "absolute", bottom: 10, width: "100%", alignItems: "center" }}>
                <CustomButton label='Accept Request' mode='contained' onPress={() => navigation.navigate("Shipment Details")} />
                <CustomButton label='Cancel' mode='outlined' onPress={() => navigation.navigate("Shipment Details")} />
            </View>
        </View>
    )
}

export default RequestsScreen

const styles = StyleSheet.create({})