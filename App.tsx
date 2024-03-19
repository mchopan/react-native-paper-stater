import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import MyDrawer from './src/navigation/DrawerExapmle';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {adaptNavigationTheme} from 'react-native-paper';

const {LightTheme} = adaptNavigationTheme({reactNavigationLight: DefaultTheme});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={MyDrawer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
