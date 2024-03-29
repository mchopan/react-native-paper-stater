import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import Card from '../components/cards/Card'
import { Colors } from '../theme/colors'
import DottenLine from '../components/DottenLine'
import Timeline from 'react-native-timeline-flatlist'


const data = [
    { title: 'Confirmed Booking', },
    { title: 'Picked Up', },
    { title: 'On the way', },
]

const ConfirmationScreen = () => {

    return (
        <View style={{ flex: 1, }}>
            <View style={{ alignItems: "center", marginTop: 50 }}>
                <Image style={{ height: 200, width: 200, resizeMode: "contain" }} source={require("../assets/confirm.png")} />
            </View>
            <View style={{ marginTop: 20 }}>
                <Card>
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "800", fontFamily: "GothicA1-Regular", color: Colors.primary }}>
                        Confirmed
                    </Text>
                    <DottenLine />
                    <Text style={{ lineHeight: 15, textAlign: "left", fontSize: 12, fontWeight: "500", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                        Your shipment has been successfully assigned to Mr Azaan.
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                        Shipment ID: LSKJ329834DK
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "700", fontFamily: "GothicA1-Regular", color: Colors.gray }}>
                        Tracking ID: 382983920WB
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "800", fontFamily: "GothicA1-Regular", color: Colors.primary }}>
                        Shipment Status
                    </Text>
                    <ScrollView>
                        <View>
                            <Timeline
                                style={{ justifyContent: "flex-start", }}
                                circleSize={12}
                                circleColor={Colors.primary}
                                lineWidth={2}
                                titleStyle={{ color: Colors.primary, fontFamily: "GothicA1-Regular", fontSize: 12, fontWeight: "700" }}
                                data={data}
                                showTime={false}
                                isUsingFlatlist={false}
                                eventContainerStyle={{ marginTop: -15, }}

                            />
                        </View>
                    </ScrollView>
                </Card>
            </View>

            <View style={{ padding: 10, gap: 10, position: "absolute", bottom: 10, width: "100%", alignItems: "center" }}>
                <CustomButton label='Track Shipment' mode='contained' onPress={() => navigation.navigate("Shipment Details")} />
            </View>
        </View >
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({

});