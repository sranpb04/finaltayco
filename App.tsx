import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import TabNavigator from './navigation/TabNavigator';
import { theme } from './src/utils/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};