import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyProfileScreen from '../screens/dealer/MyProfileScreen';
import BookingSummaryScreen from '../screens/BookingSummaryScreens/BookingSummaryScreen';
import MenuScreen from '../screens/dealer/MenuScreen';
import { Colors } from '../theme/colors';
import PlainLine from '../components/cards/PlainLine';

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
    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <DrawerContentScrollView   {...props} >
                <View style={{ padding: 30, flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', marginTop: 20 }}>
                    <View style={{ borderRadius: 40, overflow: 'hidden', backgroundColor: 'black' }}>
                        <Image style={{ width: 60, height: 60 }} source={require('../assets/profile.png')} />
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontFamily: 'GothicA1-Regular', fontSize: 15, fontWeight: '700' }}>Manzoor Chopan</Text>
                        <Text style={{ color: 'white', fontFamily: 'GothicA1-Regular', fontSize: 17, fontWeight: '500' }}>7780883346</Text>
                    </View>
                </View>
                <PlainLine />
                {/* Custom Drawer Items */}
                <CustomDrawerItem label="My Profile" icon={require('../assets/profileicon.png')} onPress={() => props.navigation.navigate('My Profile')} />
                <CustomDrawerItem label="Booking Summary" icon={require('../assets/bookingsummary.png')} onPress={() => props.navigation.navigate('Booking Summary')} />
                <CustomDrawerItem label="Refer a Friend" icon={require('../assets/referafriend.png')} onPress={() => props.navigation.navigate('Home')} />
                <CustomDrawerItem label="Call Support" icon={require('../assets/callsupport.png')} onPress={() => props.navigation.navigate('Home')} />
                <CustomDrawerItem label="About Us" icon={require('../assets/aboutus.png')} onPress={() => props.navigation.navigate('Home')} />
                <CustomDrawerItem label="Log Out" icon={require('../assets/logout.png')} onPress={() => props.navigation.navigate('Home')} />
            </DrawerContentScrollView>
        </View>
    );
};

function DrawerNavigation() {
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
            <Drawer.Screen name="Home" component={MenuScreen} />
            <Drawer.Screen name="My Profile" component={MyProfileScreen} />
            <Drawer.Screen name="Booking Summary" component={BookingSummaryScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;
