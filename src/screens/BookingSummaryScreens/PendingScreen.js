import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PendingScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image style={{ width: 200, height: 200 }} resizeMode='contain' source={require("../../assets/noPending.png")} />
        </View>
    )
}

export default PendingScreen

const styles = StyleSheet.create({})