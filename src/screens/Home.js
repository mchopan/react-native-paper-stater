import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyDrawer from '../navigation/DrawerExapmle'

const Home = () => {
    return (
        <View>
            <MyDrawer />
            <Text style={{ color: "red" }}> Hello</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})