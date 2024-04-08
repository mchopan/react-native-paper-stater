import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import AuthNavigation from './src/navigation/auth';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {MyContext} from './src/store/MyContext';
import MainNavigation from './src/navigation/main';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('dealerData');
    if (userDataString !== null) {
      // User data found in local storage, parse and return
      const userData = JSON.parse(userDataString);
      return userData;
    } else {
      // No user data found in local storage
      return null;
    }
  } catch (error) {
    // Error retrieving user data
    console.error('Error retrieving user data:', error);
    return null;
  }
};

export default function App() {
  const theme = useTheme();
  const {isAuthenticated, setIsAuthenticated} = React.useContext(MyContext);

  const getUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('dealerData');
      if (userDataString !== null) {
        const userData = JSON.parse(userDataString);
        setIsAuthenticated(true);
        return userData;
      } else {
        // No user data found in local storage
        return null;
      }
    } catch (error) {
      // Error retrieving user data
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
