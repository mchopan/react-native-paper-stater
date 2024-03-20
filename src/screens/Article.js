import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, useTheme } from 'react-native-paper'
import CustomInput from '../components/CustomInput'

const Article = () => {

    const theme = useTheme()

    return (
        <View style={{
            backgroundColor: theme.colors.background,
            flex: 1,
        }}>
            <Text style={{ color: theme.colors.primary }}>Article</Text>
            <CustomInput type="select" />

        </View >
    )
}

export default Article

const styles = StyleSheet.create({})