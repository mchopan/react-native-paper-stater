import * as React from 'react';
import { AppRegistry } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import { lightTheme } from './src/theme/lightTheme';


const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
        ...DefaultTheme.colors,
        colors: lightTheme.colors
    },
};

export default function Main() {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);