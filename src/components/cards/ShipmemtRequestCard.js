import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Card from './Card'
import { Colors } from '../../theme/colors'
import DottenLine from '../DottenLine'

const ShipmemtRequestCard = () => {
    return (
        <Card >
            <View style={{ gap: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ color: Colors.primary, fontWeight: "700", fontSize: 19, fontFamily: "GothicA1-Regular" }}>Shipment Requests !</Text>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 }}>
                        <View style={{ backgroundColor: "white", borderRadius: 20, padding: 5, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ height: 15, width: 15 }} source={require('../../assets/tick.png')} />
                        </View>
                        <Text style={{ fontSize: 13, fontWeight: "700", fontFamily: "GothicA1-Regular", color: "#E66613" }}>Paid</Text>
                    </View>
                </View>
                {/* dotted line */}
                <DottenLine />
                <View >
                    <View style={{ marginBottom: 10 }}  >
                        <Text style={{ fontSize: 16, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>Delhi to Srinagar</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: "600", lineHeight: 24, fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                            The Driver ABC is agreeing at your given
                            conditions, and has paid for the request.
                        </Text>
                    </View>
                </View>
                {/* details short card */}
                <TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>More Details</Text>
                </TouchableOpacity>
            </View>
        </Card>
    )
}

export default ShipmemtRequestCard

const styles = StyleSheet.create({

})