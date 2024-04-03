import { StyleSheet } from 'react-native'
import React from 'react'
import BookingSummaryCard from '../../components/cards/BookingSummaryCard'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingScreen from './PendingScreen';
import OngoingScreen from './OngoingScreen';
import CompletedScreen from './CompletedScreen';
import { Colors } from '../../theme/colors';

const Tab = createMaterialTopTabNavigator();

const BookingSummaryScreen = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { fontSize: 12, fontWeight: "600", fontFamily: "GothicA1-Regular" },
            tabBarStyle: { backgroundColor: Colors.tertiary },
            tabBarActiveTintColor: Colors.primary,
        }}>
            <Tab.Screen name="Ongoing" component={OngoingScreen} />
            <Tab.Screen name="Pending" component={PendingScreen} />
            <Tab.Screen name="Completed" component={CompletedScreen} />
        </Tab.Navigator>
    )
}
export default BookingSummaryScreen

const styles = StyleSheet.create({})