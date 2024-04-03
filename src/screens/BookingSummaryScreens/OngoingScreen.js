import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SelectTruckCard from '../../components/cards/SelectTruckCard'
import SelectLoadCard from '../../components/cards/SelectLoadCard'

const OngoingScreen = () => {
    return (
        <FlatList data={[1, 2, 3, 4]} renderItem={() => {
            return (
                <>
                    <SelectTruckCard />
                    <SelectLoadCard />
                </>
            )
        }}
        />
    )
}

export default OngoingScreen

const styles = StyleSheet.create({})