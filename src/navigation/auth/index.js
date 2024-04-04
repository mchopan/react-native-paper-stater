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
import FindLoadScreen from '../../screens/driver/FindLoadScreen'
import LoadDetailsScreen from '../../screens/driver/LoadDetailsScreen'
import FindTruckScreen from '../../screens/dealer/FindTruckScreen'
import GenerateOtpScreen from '../../screens/commonScreens/GenerateOtpScreen'
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
            <Stack.Screen name='Registrater Number' component={GenerateOtpScreen} />


            {/* Dealer Stack */}
            <Stack.Screen name='Registration' component={Registration} />
            <Stack.Screen options={{ headerShown: false }} name='Menu Screen' component={DrawerNavigation} />
            <Stack.Screen name='Home Screen' component={HomeScreen} />
            <Stack.Screen name='Requests' component={RequestsScreen} />
            <Stack.Screen name='Shipment Details' component={ShipmentDetails} />
            <Stack.Screen name='Booking Summary' component={BookingSummaryScreen} />
            <Stack.Screen name='Find Truck' component={FindTruckScreen} />

            {/* Driver Stack */}
            <Stack.Screen name='Driver Registration' component={DriverRegistration} />
            <Stack.Screen options={{ headerShown: false }} name='Driver Menu Screen' component={DrawerNavigation} />
            <Stack.Screen name='Find Load' component={FindLoadScreen} />
            <Stack.Screen name='Load Details' component={LoadDetailsScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigation

const styles = StyleSheet.create({})