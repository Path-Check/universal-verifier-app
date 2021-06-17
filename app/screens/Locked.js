import React, { useState, useEffect, useContext } from 'react';

import {
  StyleSheet,
  Text, View, SafeAreaView,
  TouchableOpacity, Alert, StatusBar
} from 'react-native';

import { useIsFocused } from "@react-navigation/native";
import { useTheme } from '../themes/ThemeProvider';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { AuthContext } from '../AuthContext';

import { AppState } from "react-native";

import * as LocalAuthentication from 'expo-local-authentication'

function Locked({ navigation, route }) {
  const {authData, signIn} = useContext(AuthContext);

  const isFocused = useIsFocused();
  const {colors, isDark} = useTheme();

  const [isTryingToSignIn, setIsTryingToSignIn] = useState(false);

  const handleBiometricAuthFailure = async (error: string) => {
    switch (error) {
      case 'NOT_ENROLLED':
        Alert.alert(
          `Not Enrolled`,
          'This device does not have biometric login enabled.',
        );
        break;
      case 'NOT_PRESENT':
        Alert.alert('', 'This device does not have the required hardware.');
        return;
      case 'AUTHENTICATION_FAILED':
        Alert.alert('', 'Authentication failed too many times');
        break;
      case 'NOT_AVAILABLE':
        Alert.alert('', 'Authentication is not available.');
        break;
      default:
    }
  };

  const signInBiometricAuth = async () => {
    if (isTryingToSignIn) {
      await LocalAuthentication.cancelAuthenticate();
    }

    console.log("Logging in");
    setIsTryingToSignIn(true);
    const authenticateResult = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics', 
      cancelLabel: 'Cancel',
      disableDeviceFallback: true, 
      fallbackLabel: 'Use PIN'
    });

    console.log("Logged in", authenticateResult);

    if (authenticateResult.success) {
      signIn();
    } else {
      handleBiometricAuthFailure(authenticateResult);
    }
    setIsTryingToSignIn(false);
  }

  const unlock = async () => {
    if (isTryingToSignIn) return;

    if (!authData && !isTryingToSignIn && AppState.currentState === "active") {
      signInBiometricAuth();
    }
  }

  useEffect(() => {
    changeNavigationBarColor(colors.background, !isDark);
    unlock();
  }, [isFocused]);

  return (
    <View style={styles.container} backgroundColor={colors.background}>
        <StatusBar 
          backgroundColor={colors.background}
          barStyle={isDark ? "light-content" : "dark-content"}/>

        <Text>Locked App</Text>

        <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.primary}]}
            onPress={unlock}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            >
              <Text style={[styles.buttonText, { color: '#fff'}]}>Unlock</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: (Platform.OS === 'ios') ? 40 : 0,
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  centerEmptySet: { 
    height: '100%'
  }, 
    button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    color: '#fff',
    padding: 15,
    width: '70%', 
    position: 'absolute',
    bottom:20, 
    elevation: 2, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00, 
  },
  buttonText: {
    alignItems: "center",
    fontSize: 16,
		lineHeight: 18, 
    fontWeight: 'bold'
  },
});

export default Locked;