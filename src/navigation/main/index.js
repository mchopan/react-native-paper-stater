import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'
import HomeScreen from '../../screens/driver/HomeScreen'
import RequestsScreen from '../../screens/dealer/RequestsScreen'
import ShipmentDetails from '../../screens/dealer/ShipmentDetails'
import BookingSummaryScreen from '../../screens/bookingSummaryScreens/BookingSummaryScreen'
import DrawerNavigation from '../DrawerNavigation'
import FindLoadScreen from '../../screens/driver/FindLoadScreen'
import LoadDetailsScreen from '../../screens/driver/LoadDetailsScreen'
import FindTruckScreen from '../../screens/dealer/FindTruckScreen'
import NetworkLogs from '../../screens/NetworkLogs'
import BookingDetailsScreen from '../../screens/dealer/BookingDetailsScreen'
import ShipmentRequestScreen from '../../screens/driver/ShipmentRequestScreen'
import MakeBidScreen from '../../screens/commonScreens/MakeBidScreen'
import BidChat from '../../screens/commonScreens/BidChat'
import ReferAFriend from '../../screens/commonScreens/ReferAFriend'
import CallSupport from '../../screens/commonScreens/CallSupport'
import About from '../../screens/commonScreens/About'
import BidHistory from '../../screens/commonScreens/BidHistory'
import PdfFiles from '../../screens/driver/PdfFiles'

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
            <Stack.Screen name='Booking Details' component={BookingDetailsScreen} />

            <Stack.Screen name='Refer a Friend' component={ReferAFriend} />
            <Stack.Screen name='Call Support' component={CallSupport} />
            <Stack.Screen name='About Us' component={About} />
            <Stack.Screen name='Network Logs' component={NetworkLogs} />
            {/* Driver Stack */}
            <Stack.Screen options={{ headerShown: false }} name='Driver Menu Screen' component={DrawerNavigation} />
            <Stack.Screen name='Find Load' component={FindLoadScreen} />
            <Stack.Screen name='Load Details' component={LoadDetailsScreen} />
            <Stack.Screen name='Shipment Requests' component={ShipmentRequestScreen} />
            <Stack.Screen name='Make Bid' component={MakeBidScreen} />
            <Stack.Screen name='Bid Chat' component={BidChat} />
            <Stack.Screen name='Bid History' component={BidHistory} />

            <Stack.Screen name='Pdf Files' component={PdfFiles} />

        </Stack.Navigator>
    )
}

export default MainNavigation

const styles = StyleSheet.create({})