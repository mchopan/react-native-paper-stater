import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'

const Feed = () => {
    const theme = useTheme()
    return (
        <View>
            <Text style={{ color: theme.colors.error }}>Feed</Text>
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({})