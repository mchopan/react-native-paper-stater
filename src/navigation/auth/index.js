import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../screens/Login'
import WelcomsScreen from '../../screens/WelcomsScreen'
import Registration from '../../screens/Registration'
import { Colors } from '../../theme/colors'
import { useTheme } from 'react-native-paper'
import OtpScreen from '../../screens/OtpScreen'
import BookingDetailsScreen from '../../screens/BookingDetailsScreen'
import MyProfileScreen from '../../screens/MyProfileScreen'
import MenuScreen from '../../screens/MenuScreen'
import HomeScreen from '../../screens/HomeScreen'
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
            <Stack.Screen options={{ headerShown: false }} name='Welcome' component={WelcomsScreen} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Registration' component={Registration} />
            <Stack.Screen name='Verification' component={OtpScreen} />
            <Stack.Screen name='Menu Screen' component={MenuScreen} />
            <Stack.Screen name='Home Screen' component={HomeScreen} />
            <Stack.Screen name='Booking Details' component={BookingDetailsScreen} />
            <Stack.Screen name='My Profile' component={MyProfileScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigation

const styles = StyleSheet.create({})