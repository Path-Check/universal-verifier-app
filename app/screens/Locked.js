import React, { useState, useEffect, useContext } from 'react';

import {
  StyleSheet, Image,
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
  }, [isFocused]);

  return (
    <View style={styles.container} backgroundColor={colors.background}>
        <StatusBar 
          backgroundColor={colors.background}
          barStyle={isDark ? "light-content" : "dark-content"}/>

        <Image
          style={styles.logo}
          color={colors.primary}
          source={{
            uri: 'data:image/png;base64,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',
          }}
        />

        <Text>App Locked</Text>

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
  logo: {
    width: 100,
    height: 100
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