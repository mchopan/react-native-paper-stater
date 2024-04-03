import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spacer = ({ space }) => {
    return (
        <View style={{ height: space || 5 }} />
    )
}

export default Spacer

const styles = StyleSheet.create({})