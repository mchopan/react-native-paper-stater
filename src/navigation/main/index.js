import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'
import HomeScreen from '../../screens/dealer/HomeScreen'
import RequestsScreen from '../../screens/dealer/RequestsScreen'
import ShipmentDetails from '../../screens/dealer/ShipmentDetails'
import BookingSummaryScreen from '../../screens/bookingSummaryScreens/BookingSummaryScreen'
import DrawerNavigation from '../DrawerNavigation'
import FindLoadScreen from '../../screens/driver/FindLoadScreen'
import LoadDetailsScreen from '../../screens/driver/LoadDetailsScreen'
import FindTruckScreen from '../../screens/dealer/FindTruckScreen'

const Stack = createNativeStackNavigator()

const MainNavigation = () => {
    const theme = useTheme()
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: "white",
        }}>

            {/* Dealer Stack */}
            <Stack.Screen options={{ headerShown: false }} name='Menu Screen' component={DrawerNavigation} />
            <Stack.Screen name='Home Screen' component={HomeScreen} />
            <Stack.Screen name='Requests' component={RequestsScreen} />
            <Stack.Screen name='Shipment Details' component={ShipmentDetails} />
            <Stack.Screen name='Booking Summary' component={BookingSummaryScreen} />
            <Stack.Screen name='Find Truck' component={FindTruckScreen} />

            {/* Driver Stack */}
            <Stack.Screen options={{ headerShown: false }} name='Driver Menu Screen' component={DrawerNavigation} />
            <Stack.Screen name='Find Load' component={FindLoadScreen} />
            <Stack.Screen name='Load Details' component={LoadDetailsScreen} />
        </Stack.Navigator>
    )
}

export default MainNavigation

const styles = StyleSheet.create({})