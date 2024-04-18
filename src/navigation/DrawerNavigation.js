import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyProfileScreen from '../screens/commonScreens/MyProfileScreen';
import BookingSummaryScreen from '../screens/bookingSummaryScreens/BookingSummaryScreen';
import MenuScreen from '../screens/dealer/MenuScreen';
import { Colors } from '../theme/colors';
import PlainLine from '../components/cards/PlainLine';
import HomeScreen from '../screens/dealer/HomeScreen';
import { USER_TYPES, UserTypeContext } from '../store/UserTypeContext';
import { getUserData } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext, MyContextProvider } from '../store/MyContext';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

// Custom Drawer Item Component
const CustomDrawerItem = ({ label, icon, onPress }) => (
    <DrawerItem
        label={label}
        labelStyle={{ color: 'white', fontFamily: 'GothicA1-Regular', fontSize: 15, fontWeight: '700' }}
        icon={() => <Image resizeMode="contain" style={{ height: 25, width: 25 }} source={icon} />}
        onPress={onPress}
    />
);

// Custom Drawer Content Component
const CustomDrawerContent = (props) => {

    const { setUserAsDriver, setUserAsDealer } = useContext(UserTypeContext)

    const getUserData = async () => {
        let userDataString = null;
        try {
            // Check if dealer data exists
            const dealerDataString = await AsyncStorage.getItem('dealerData');
            // console.log(dealerDataString, 'dealer');
            if (dealerDataString !== null) {
                userDataString = dealerDataString;
                setUserAsDealer()
            }

            // If userDataString is still null, check for driver data
            if (!userDataString) {
                const driverDataString = await AsyncStorage.getItem('driverData');
                // console.log(driverDataString, 'driver');
                if (driverDataString !== null) {
                    userDataString = driverDataString;
                    setUserAsDriver()
                }
            }

            // Parse and return userDataString if it exists, otherwise return null
            if (userDataString !== null) {
                const userData = JSON.parse(userDataString);
                setIsAuthenticated(true);
                return userData;
            } else {
                // No user data found in local storage
                return null;
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
            return null;
        }
    };

    const navigation = useNavigation()

    const { setIsAuthenticated, user, setUser } = React.useContext(MyContext);


    const fetchUserData = async () => {
        const userDetails = await getUserData();
        console.log(userDetails, "userDetails")
        setUser(userDetails)
    };

    useEffect(() => {
        fetchUserData();
    }, [])

    const showDeleteAlert = () => {
        Alert.alert(
            'Logout Confirmation',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => handleLogout(),
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            setIsAuthenticated(false)
            navigation.navigate("Welcome")
            Toast.show({
                type: 'success',
                text1: 'Logout successfully',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error while logout',
                text2: 'Opps',
            });
            console.error(' Logout Error:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <DrawerContentScrollView   {...props} >
                <View style={{ padding: 30, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', marginTop: 20 }}>
                    <View style={{ borderRadius: 40, overflow: 'hidden', backgroundColor: 'black' }}>
                        <Image style={{ width: 60, height: 60 }} source={!user ? require('../assets/profile.png') : { uri: user.imageFile }} />
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontFamily: 'GothicA1-Regular', fontSize: 15, fontWeight: '700' }}>{user?.name}</Text>
                        <Text style={{ color: 'white', fontFamily: 'GothicA1-Regular', fontSize: 17, fontWeight: '500' }}>{user?.phoneNumber}</Text>
                    </View>
                </View>
                <PlainLine />
                {/* Custom Drawer Items */}
                <CustomDrawerItem label="My Profile" icon={require('../assets/profileicon.png')} onPress={() => props.navigation.navigate('My Profile')} />
                <CustomDrawerItem label="Booking Summary" icon={require('../assets/bookingsummary.png')} onPress={() => props.navigation.navigate('Booking Summary')} />
                <CustomDrawerItem label="Refer a Friend" icon={require('../assets/referafriend.png')} onPress={() => props.navigation.navigate('Home')} />
                <CustomDrawerItem label="Call Support" icon={require('../assets/callsupport.png')} onPress={() => props.navigation.navigate('Home')} />
                <CustomDrawerItem label="About Us" icon={require('../assets/aboutus.png')} onPress={() => props.navigation.navigate('Home')} />
                <CustomDrawerItem label="Log Out" icon={require('../assets/logout.png')} onPress={showDeleteAlert} />
            </DrawerContentScrollView>
        </View>
    );
};

function DrawerNavigation() {

    const { userType } = useContext(UserTypeContext)

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                drawerLabelSyle: { marginLeft: -30 }
            }}
        >
            <Drawer.Screen name="Home" component={userType == USER_TYPES.DEALER ? MenuScreen : HomeScreen} />
            <Drawer.Screen name="My Profile" component={MyProfileScreen} />
            <Drawer.Screen name="Booking Summary" component={BookingSummaryScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;
