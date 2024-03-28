import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import { Colors } from '../../theme/colors'
import Card from './Card'

const ShipmentCard = () => {
    const theme = useTheme()
    return (
        <Card direction={"row"}>
            <View style={styles.leftText}>
                <Text style={[styles.heading]}>Shipment</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <View style={styles.ellipseOuter}>
                        <View style={styles.ellipse}></View>
                    </View>
                    <Text style={styles.heading}>Pick-up Location</Text>
                </View>
                <View>
                    <Text style={styles.subHeading} >Delhi, old city, 231900</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <View style={styles.ellipseOuter}>
                        <View style={styles.ellipse}></View>
                    </View>
                    <Text style={styles.heading}>Drop Location</Text>
                </View>
                <Text style={styles.subHeading} >Srinagar , Eidgah ,19279</Text>
            </View>
            <View style={styles.rightImage}>
                <Image style={{ width: 170, height: 160, borderRadius: 10 }} source={require("../../assets/mapSmall.png")} />
            </View>
        </Card>
    )
}

export default ShipmentCard

const styles = StyleSheet.create({
    leftText: {
        width: "50%",
        flexWrap: "wrap",
        gap: 5
    },
    heading: {
        fontSize: 13,
        fontWeight: "800",
        color: Colors.primary,
        fontFamily: "GothicA1-Regular"
    },
    subHeading: {
        fontSize: 12,
        fontWeight: "500",
        color: Colors.gray,
        fontFamily: "GothicA1-Regular"
    },
    ellipseOuter: {
        width: 14,
        height: 14,
        backgroundColor: Colors.whiteBackground,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.gray
    },
    ellipse: {
        position: "absolute",
        width: 10,
        height: 10,
        backgroundColor: Colors.primary,
        borderRadius: 5
    }
})