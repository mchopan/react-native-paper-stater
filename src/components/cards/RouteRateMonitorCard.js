import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Card from './Card'
import { Colors } from '../../theme/colors'
import { textVariants } from '../../theme/styleVariants'


{/* <Text >Want to book a truck?</Text> */ }


const RouteRateMonitorCard = ({ item }) => {
    const [showFullName, setShowFullName] = useState(false);

    const formatVehicleType = (vehicleType) => {
        const cleanedType = vehicleType.split('(')[0];
        const parts = cleanedType.trim().split(/[\s_]+/);
        return parts
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const getAbbreviation = (vehicleType) => {
        const cleanedType = vehicleType.split('(')[0];
        const parts = cleanedType.trim().split(/[\s_]+/);
        return parts
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    }

    return (
        <>
            <View style={styles.cardContainer}>
                <View style={styles.contentRow}>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>
                            {item.fromLocation}
                            <Text style={styles.toText}> → </Text>
                            {item.toLocation}
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.priceText}>₹{item.price}</Text>
                        <TouchableOpacity
                            onLongPress={() => setShowFullName(true)}
                            delayLongPress={200}
                        >
                            <Text style={styles.vehicleText}>
                                {getAbbreviation(item.vehicleType)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal
                transparent
                visible={showFullName}
                onRequestClose={() => setShowFullName(false)}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowFullName(false)}
                >
                    <View style={styles.tooltipContainer}>
                        <Text style={styles.tooltipText}>
                            {formatVehicleType(item.vehicleType)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}

export default RouteRateMonitorCard

const styles = StyleSheet.create({
    cardContainer: {
        margin: 8,
        padding: 12,
        backgroundColor: Colors.whiteBackground,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    contentRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    locationContainer: {
        flex: 2,
        paddingRight: 12,
    },
    locationText: {
        fontFamily: "GothicA1-SemiBold",
        fontSize: 14,
        color: Colors.primary,
        lineHeight: 20,
    },
    toText: {
        color: Colors.primary,
        opacity: 0.7,
    },
    detailsContainer: {
        flex: 1,
        alignItems: 'flex-end',
        maxWidth: '45%',
    },
    priceText: {
        fontFamily: "GothicA1-Bold",
        fontSize: 16,
        color: Colors.primary,
        marginBottom: 2,
    },
    vehicleText: {
        fontFamily: "GothicA1-Regular",
        fontSize: 13,
        color: Colors.primary,
        opacity: 0.9,
        marginTop: 2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooltipContainer: {
        backgroundColor: Colors.whiteBackground,
        padding: 16,
        borderRadius: 8,
        maxWidth: '80%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    tooltipText: {
        fontFamily: "GothicA1-Medium",
        fontSize: 16,
        color: Colors.primary,
        textAlign: 'center',
    },
});