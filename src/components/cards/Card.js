import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'

const Card = ({ overflow, children, direction, padding, bgColor, flex }) => {
    return (
        <View style={[styles.cardContainer, { overflow: overflow, flex: flex || 0, backgroundColor: bgColor || Colors.tertiary, padding: padding || 0, flexDirection: direction == "row" ? "row" : "column" }]}>
            {children}
        </View >
    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        borderColor: Colors.gray,
        borderWidth: 1,
        flexDirection: "row",
        margin: 10,
        borderRadius: 10,
        gap: 5,
        shadowColor: 'black',
        shadowOpacity: 0.20,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 20,
        elevation: 10,
    },
})