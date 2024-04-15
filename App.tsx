import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import AuthNavigation from './src/navigation/auth';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {MyContext} from './src/store/MyContext';
import MainNavigation from './src/navigation/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_TYPES, UserTypeContext} from './src/store/UserTypeContext';

export default function App() {
  const theme = useTheme();
  const {isAuthenticated, setIsAuthenticated} = React.useContext(MyContext);

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

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.primary} />
      {isAuthenticated ? <MainNavigation /> : <AuthNavigation />}
      <Toast />
    </NavigationContainer>
  );
}
