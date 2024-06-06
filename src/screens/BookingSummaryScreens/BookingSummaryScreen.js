import { StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingScreen from './PendingScreen';
import OngoingScreen from './OngoingScreen';
import CompletedScreen from './CompletedScreen';
import { Colors } from '../../theme/colors';
import { USER_TYPES, UserTypeContext } from '../../store/UserTypeContext';

const Tab = createMaterialTopTabNavigator();

const BookingSummaryScreen = () => {

    const { userType } = useContext(UserTypeContext)


    return (
        <Tab.Navigator screenOptions={{
            tabBarLabelStyle: { fontSize: 12, fontWeight: "600", fontFamily: "GothicA1-Regular" },
            tabBarStyle: { backgroundColor: Colors.tertiary },
            tabBarActiveTintColor: Colors.primary,
        }}>
            <Tab.Screen name="Ongoing" component={OngoingScreen} />
            {userType == USER_TYPES.DEALER &&
                <Tab.Screen name="Pending" component={PendingScreen} />
            }
            <Tab.Screen name="Completed" component={CompletedScreen} />
        </Tab.Navigator>
    )
}
export default BookingSummaryScreen

const styles = StyleSheet.create({})