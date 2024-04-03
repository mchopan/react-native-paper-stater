import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BookingSummaryCard from '../../components/cards/BookingSummaryCard'

const CompletedScreen = () => {
    return (
        <View>
            <FlatList data={[1, 2, 3, 4, 5]} renderItem={() => {
                return (
                    <BookingSummaryCard />
                )
            }} />
        </View>
    )
}

export default CompletedScreen

const styles = StyleSheet.create({})