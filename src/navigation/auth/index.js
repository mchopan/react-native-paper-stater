import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../screens/commonScreens/Login'
import WelcomsScreen from '../../screens/commonScreens/WelcomsScreen'
import Registration from '../../screens/dealer/Registration'
import { useTheme } from 'react-native-paper'
import OtpScreen from '../../screens/commonScreens/OtpScreen'
import HomeScreen from '../../screens/dealer/HomeScreen'
import RequestsScreen from '../../screens/dealer/RequestsScreen'
import ShipmentDetails from '../../screens/dealer/ShipmentDetails'
import ConfirmationScreen from '../../screens/commonScreens/ConfirmationScreen'
import BookingSummaryScreen from '../../screens/BookingSummaryScreens/BookingSummaryScreen'
import DrawerNavigation from '../DrawerNavigation'
import DriverRegistration from '../../screens/driver/DriverRegistration'
import DriverMenuScreen from '../../screens/driver/DriverMenuScreen'
const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
    const theme = useTheme()
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
                backgroundColor: theme.colors.primary,
            },
            headerTintColor: "white",
        }} initialRouteName='Welcome'>
            {/* Common Stack */}
            <Stack.Screen options={{ headerShown: false }} name='Welcome' component={WelcomsScreen} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Verification' component={OtpScreen} />
            <Stack.Screen name='Confirmation' component={ConfirmationScreen} />

            {/* Dealer Stack */}
            <Stack.Screen name='Registration' component={Registration} />
            <Stack.Screen options={{ headerShown: false }} name='Menu Screen' component={DrawerNavigation} />
            <Stack.Screen name='Home Screen' component={HomeScreen} />
            <Stack.Screen name='Requests' component={RequestsScreen} />
            <Stack.Screen name='Shipment Details' component={ShipmentDetails} />
            <Stack.Screen name='Booking Summary' component={BookingSummaryScreen} />

            {/* Driver Stack */}
            <Stack.Screen name='Driver Registration' component={DriverRegistration} />
            <Stack.Screen name='Driver Menu Screen' component={DriverMenuScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigation

const styles = StyleSheet.create({})