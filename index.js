import * as React from 'react';
import { AppRegistry, useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import { darkTheme } from './src/theme/darkTheme';
import { lightTheme } from './src/theme/lightTheme';


const LightTheme = {
    ...MD3LightTheme,
    colors: lightTheme.colors
}

const DarkTheme = {
    ...MD3DarkTheme,
    colors: darkTheme.colors
}

export default function Main() {

    const colorScheme = useColorScheme();

    const theme = colorScheme === "dark" ? DarkTheme : LightTheme;

    const updatedTheme = {
        ...theme,
        fonts: {
            ...theme.fonts,
            bodyLarge: {
                ...theme.fonts.bodyLarge,
                fontFamily: 'GothicA1-Regular',
            },
        },
    };


    return (
        <PaperProvider theme={updatedTheme}>
            <App />
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);