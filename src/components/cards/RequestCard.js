import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { Colors } from '../../theme/colors'

const SmallCard = () => {
    return (
        <View style={styles.smallCardStyles}>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <View>
                    <Image style={{ width: 25, height: 25 }} source={require("../../assets/truck.png")} />
                </View>
                <View>
                    <Text style={{ color: Colors.primary, fontWeight: "800", fontSize: 14, fontFamily: "GothicA1-Regular" }}>Driver ABC</Text>
                    <Text style={{ color: Colors.gray, fontWeight: "500", fontSize: 12, fontFamily: "GothicA1-Regular" }}>Srinagar -  Delhi</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Text style={{ color: Colors.primary, fontWeight: "600", fontSize: 12, fontFamily: "GothicA1-Regular" }}>See Details</Text>
            </TouchableOpacity>
        </View>
    )
}

const RequestCard = () => {
    return (
        <Card direction={"column"} >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                <Text style={{ color: Colors.primary, fontWeight: "800", fontSize: 14, fontFamily: "GothicA1-Regular" }}>Requests</Text>
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 }}>
                    <View style={{ backgroundColor: "white", borderRadius: 20, padding: 5, justifyContent: "center", alignItems: "center" }}>
                        <Image style={{ height: 15, width: 15 }} source={require('../../assets/tick.png')} />
                    </View>
                    <Text style={{ fontSize: 13, fontWeight: "700", fontFamily: "GothicA1-Regular", color: "#E66613" }}>Paid</Text>
                </TouchableOpacity>
            </View>
            <SmallCard />
            <SmallCard />
            <TouchableOpacity style={{ marginTop: 10 }}>
                <Text style={{ color: Colors.primary, fontWeight: "600", fontSize: 13, fontFamily: "GothicA1-Regular" }}>View All</Text>
            </TouchableOpacity>
        </Card>
    )
}

export default RequestCard

const styles = StyleSheet.create({
    smallCardStyles: {
        flexDirection: "row",
        backgroundColor: Colors.whiteBackground,
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
            android: {
                elevation: 3,
            },
        }),
    },
})