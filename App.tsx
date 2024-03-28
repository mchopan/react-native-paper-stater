import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
// import MyDrawer from './src/navigation/DrawerExapmle';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {adaptNavigationTheme, useTheme} from 'react-native-paper';
import AuthNavigation from './src/navigation/auth';
import {StatusBar} from 'react-native';

const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});

const Stack = createNativeStackNavigator();

export default function App() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={theme.colors.primary} />
      <AuthNavigation />
    </NavigationContainer>
  );
}
