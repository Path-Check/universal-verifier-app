/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {createContext, useContext, useState, useEffect} from 'react';
import Entry from './app/screens/Entry';
import Locked from './app/screens/Locked';
import Loading from './app/screens/Loading';
import QRReader from './app/screens/QRReader';
import QRShow from './app/screens/QRShow';
import QRResult from './app/screens/QRResult';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './app/themes/ThemeProvider';
import { AuthContext } from './app/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication'

import { AppState } from "react-native";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
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

      <Stack.Screen
        name="QRShow"
        component={QRShow}
        options={{ title: 'Share QR' }}
      />

      <Stack.Screen
        name="QRResult"
        component={QRResult}
        options={{ title: 'Verification Complete' }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Locked"
        component={Locked}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Router = () => {
  const {authData, loading, signIn, signOut} = useContext(AuthContext);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState !== "active") {
      signOut();
    }
  };

  if (loading) {
    return ( <Loading /> );
  }
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isBiometricSupported, setIsBiometricSupported] = useState(undefined);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(undefined);

  const loadBiometricSupport = async () => {
      if (!isBiometricSupported) {
        setIsBiometricSupported(await LocalAuthentication.hasHardwareAsync());
        if (!isBiometricEnabled) {
          setIsBiometricEnabled(await LocalAuthentication.isEnrolledAsync());
        }
      }

      if (!isBiometricSupported || !isBiometricEnabled) {
        signIn();
      }
      setLoading(false);
  };

  useEffect(() => {
    loadBiometricSupport();
  });

  const signIn = async () => {
    const _authData = 'authenticated'
    setAuthData(_authData);
  };

  const signOut = async () => {
    if (isBiometricSupported && isBiometricEnabled)
      setAuthData(undefined);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  return (
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
  );
};

export default App;
