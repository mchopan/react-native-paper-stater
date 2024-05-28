import { Image, StyleSheet, View, } from 'react-native'
import React from 'react'
import Card from './Card'
import PlainLine from './PlainLine'
import { Text } from 'react-native-paper'
import { Colors } from '../../theme/colors'

const LoadDetailsCard = ({ item }) => {
    console.log(item, "itemsgsg ")

    const originalDate = new Date(item.selectDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = originalDate.toLocaleDateString('en-US', options);

    console.log(formattedDate);
    return (
        <Card padding={20}>
            <View style={{ width: "50%", flexDirection: "row", alignItems: "center", gap: 10, padding: 10, borderRadius: 20, backgroundColor: "#0095ff3b" }}>
                <Image style={{ height: 20, width: 20 }} source={require("../../assets/verified.png")} />
                <Text style={{ fontSize: 12, fontWeight: "500", fontFamily: "GothicA1-Regular", color: Colors.verified }}>Verified Load</Text>
            </View>
            <PlainLine />
            <View >
                <View style={{ margin: 10, flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Goods Type: </Text>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.gray }}>{item.selectGoodsType}</Text>
                </View>
                <PlainLine />
            </View>

            <View >
                <View style={{ margin: 10, flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Total weight: </Text>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.gray }}>{item.enterWeightKg} ton</Text>
                </View>
                <PlainLine />
            </View>

            <View >
                <View style={{ margin: 10, flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Pickup Date: </Text>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.gray }}>{formattedDate}</Text>
                </View>
                <PlainLine />
            </View>


            <View >
                <View style={{ margin: 10, flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Freight: </Text>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.gray }}> 100000</Text>
                </View>
                <PlainLine />
            </View>

            <View >
                <View style={{ margin: 10, flexDirection: "row" }}>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Payment Mode: </Text>
                    <Text style={{ fontSize: 14, fontWeight: "600", fontFamily: "GothicA1-Regular", color: Colors.gray }}>{item.advancePayment}</Text>
                </View>
                <PlainLine />
            </View>
        </Card >
    )
}

export default LoadDetailsCard

const styles = StyleSheet.create({})