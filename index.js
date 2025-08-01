import * as React from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import {MD3LightTheme, MD3DarkTheme, PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';
import {darkTheme} from './src/theme/darkTheme';
import {lightTheme} from './src/theme/lightTheme';
import {UserTypeProvider} from './src/store/UserTypeContext';
import {MyContextProvider} from './src/store/MyContext';

const LightTheme = {
  ...MD3LightTheme,
  colors: lightTheme.colors,
};

const DarkTheme = {
  ...MD3DarkTheme,
  colors: darkTheme.colors,
};

export default function Main() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

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
    <UserTypeProvider>
      <MyContextProvider>
        <PaperProvider theme={updatedTheme}>
          <App />
        </PaperProvider>
      </MyContextProvider>
    </UserTypeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
