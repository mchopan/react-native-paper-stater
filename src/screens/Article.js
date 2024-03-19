import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlexInput from '../components/FlexInput'
import { useTheme } from 'react-native-paper'

const Article = () => {

    const theme = useTheme()

    const items =
        [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
        ]

    return (
        <View style={{
            backgroundColor: theme.colors.background
        }
        }>
            <Text style={{ color: "red" }}>Article</Text>
            <FlexInput type="text" label="Text Input" />
            <FlexInput type="password" label="Password Input" />
            <FlexInput
                type="select"
                data={items}
                placeholder="Select an option"
            />
        </View >
    )
}

export default Article

const styles = StyleSheet.create({})