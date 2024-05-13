import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import AuthNavigation from './src/navigation/auth';
import {PermissionsAndroid, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {MyContext} from './src/store/MyContext';
import MainNavigation from './src/navigation/main';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';

export default function App() {
  const theme = useTheme();
  const {isAuthenticated, setIsAuthenticated} = React.useContext(MyContext);

  // user permissions
  React.useEffect(() => {
    requestPermissions();
  }, [PERMISSIONS]);

  const requestPermissions = async () => {
    console.log('first');
    try {
      const permissions = [
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        // Assuming POST_NOTIFICATIONS is a custom permission, it may not be directly available
        // You need to handle it separately or request it using a different method
      ];
      const results = await Promise.all(
        permissions.map(permission => request(permission)),
      );
      console.log('Permission Results:', results);
    } catch (error) {
      console.warn('Error requesting permissions:', error);
    }
  };

  const getUserData = async () => {
    let userDataString = null;
    try {
      // Check if dealer data exists
      const dealerDataString = await AsyncStorage.getItem('dealerData');
      console.log(dealerDataString, 'daa');
      if (dealerDataString !== null) {
        userDataString = dealerDataString;
      }

      // If userDataString is still null, check for driver data
      if (!userDataString) {
        const driverDataString = await AsyncStorage.getItem('driverData');
        if (driverDataString !== null) {
          userDataString = driverDataString;
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

  const fun = async () => {
    const data = await AsyncStorage.getItem('dealerData');
    console.log(data, 'stored data');
  };

  React.useEffect(() => {
    getUserData();
    fun();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.primary} />
      {isAuthenticated ? <MainNavigation /> : <AuthNavigation />}
      <Toast />
    </NavigationContainer>
  );
}
