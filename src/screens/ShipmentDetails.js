import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Card from '../components/cards/Card'
import { Text } from 'react-native-paper'
import { Colors } from '../theme/colors'
import DottenLine from '../components/DottenLine'
import CustomButton from '../components/CustomButton'

const ShipmentDetails = ({ navigation }) => {
    return (
        <>
            <Card>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontSize: 12, fontWeight: "800", fontFamily: "GothicA1-Regular", color: Colors.primary }}>
                            Your Delivery Location
                        </Text>
                        <View style={{ gap: 5 }}>
                            <Text style={{ fontSize: 14, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>
                                Lal Chowk ,Srinagar
                            </Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <Image style={{ width: 15, height: 15 }} source={require("../assets/MapPin.png")} />
                                <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                    Jammu & Kashmir
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image style={{ width: 100, height: 80, borderRadius: 10 }} source={require("../assets/mapSmall.png")} />
                    </View>
                </View >
            </Card >
            <Card>
                <View style={{ gap: 10 }}>
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: "800", fontFamily: "GothicA1-Regular", color: Colors.primary }}>
                            Loading Dates
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                Pick-Up
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: "500", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                08 December 2024
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: "#E66613" }}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                Delivery
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: "500", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                10 December 2024
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: "#E66613" }}>
                                Edit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>

            <Card>
                <View style={{ gap: 10 }}>
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: "800", fontFamily: "GothicA1-Regular", color: Colors.primary }}>
                            Rates
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                Goods Transport Price
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                25,000 INR
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                Toll Tax
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                5000 INR
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                Incentives
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                                1000 INR
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <DottenLine />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>
                            Total Cost
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.primary }}>
                            31,000 INR
                        </Text>
                    </View>
                </View>
            </Card>

            <View style={{ padding: 10, gap: 10, position: "absolute", bottom: 10, width: "100%", alignItems: "center" }}>
                <CustomButton label='Confirm Booking' mode='contained' onPress={() => navigation.navigate("Confirmation")} />
                <CustomButton label='Cancel' mode='outlined' onPress={() => console.log("canceled")} />
            </View>
        </>
    )
}

export default ShipmentDetails

const styles = StyleSheet.create({})