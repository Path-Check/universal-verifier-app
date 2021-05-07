/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Entry from './app/screens/Entry';
import QRReader from './app/screens/QRReader';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './app/themes/ThemeProvider';

const Stack = createStackNavigator();

const App = () => {
  return (
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Entry}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="QRReader"
              component={QRReader}
              options={{ title: 'Point Camera to the QR Code' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
  );
};

export default App;
