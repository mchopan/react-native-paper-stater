import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import AuthNavigation from './src/navigation/auth';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {MyContext} from './src/store/MyContext';
import MainNavigation from './src/navigation/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  requestUserPermission,
  getToken,
  handleForegroundMessages,
  handleBackgroundMessages,
} from './messaging';

export default function App() {
  React.useEffect(() => {
    requestUserPermission();
    getToken();
    const unsubscribeForeground = handleForegroundMessages();
    handleBackgroundMessages();
    return () => {
      unsubscribeForeground();
    };
  }, []);

  const theme = useTheme();
  const {isAuthenticated, setIsAuthenticated} = React.useContext(MyContext);

  // user permissions
  React.useEffect(() => {
    requestPermissions();
    console.log('ask permission');
  }, []);

  const requestPermissions = async () => {
    console.log('Requesting permissions');
    try {
      const permissions = [
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
        PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      ];

      // if (Platform.OS === 'ios') {
      //   permissions.push(
      //     PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      //     PERMISSIONS.IOS.NOTIFICATIONS
      //   );
      // }

      for (const permission of permissions) {
        const result = await request(permission);
        console.log(`Permission result for ${permission}:`, result);
        if (result !== RESULTS.GRANTED) {
          console.warn(`Permission not granted for ${permission}`);
        }
      }
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
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar backgroundColor={theme.colors.primary} />
        {isAuthenticated ? <MainNavigation /> : <AuthNavigation />}
        <Toast />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
