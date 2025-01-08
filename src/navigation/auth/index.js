import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../screens/commonScreens/Login'
import WelcomsScreen from '../../screens/commonScreens/WelcomsScreen'
import Registration from '../../screens/dealer/Registration'
import { useTheme } from 'react-native-paper'
import OtpScreen from '../../screens/commonScreens/OtpScreen'
import ConfirmationScreen from '../../screens/commonScreens/ConfirmationScreen'
import DriverRegistration from '../../screens/driver/DriverRegistration'
import GenerateOtpScreen from '../../screens/commonScreens/GenerateOtpScreen'
import NetworkLogs from '../../screens/NetworkLogs'
import ForgotPassword from '../../screens/commonScreens/ForgotPassword'
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
            <Stack.Screen name='Register Number' component={GenerateOtpScreen} />
            <Stack.Screen name='Network Logs' component={NetworkLogs} />
            <Stack.Screen name='Forgot Password' component={ForgotPassword} />
            {/* Dealer Stack */}
            <Stack.Screen name='Registration' component={Registration} />

            {/* Driver Stack */}
            <Stack.Screen name='Driver Registration' component={DriverRegistration} />
        </Stack.Navigator>
    )
}

export default AuthNavigation
