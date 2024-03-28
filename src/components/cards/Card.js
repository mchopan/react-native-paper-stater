import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/colors'

const Card = ({ children, direction }) => {
    return (
        <View style={[styles.cardContainer, { flexDirection: direction == "row" ? "row" : "column" }]}>
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
        padding: 20,
        backgroundColor: Colors.tertiary,
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