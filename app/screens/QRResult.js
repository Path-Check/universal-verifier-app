import React, {useEffect} from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

import {useTheme} from '../themes/ThemeProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';

import CowinCard from './../components/CowinCard';
import VaccineCard from './../components/VaccineCard';
import CouponCard from './../components/CouponCard';
import StatusCard from './../components/StatusCard';
import PassKeyCard from './../components/PassKeyCard';
import SHCCard from './../components/SHCCard';
import DCCCard from './../components/DCCCard';
import DCCUYCard from './../components/DCCUYCard';
import VDSVAXCard from './../components/VDSVaxCard';
import VDSTESTCard from './../components/VDSTestCard';

import { removeCard } from './../utils/StorageManager';


const screenWidth = Math.round(Dimensions.get('window').width)-50;

function QRResult({ navigation, route }) {
  const {colors} = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.background }, 
      headerTintColor: colors.text
    });
  });

  const removeItem = async (signature) => {
    await removeCard(signature);
    navigation.navigate({name: 'Home'});
  };

  const onPress = () => {
    navigation.navigate({name: 'Home'});
  }; 

  const qr = route.params.result.payload;

  return (
    <View style={styles.container} backgroundColor={colors.background}>
      <View style={styles.verifiedPill} backgroundColor={colors.primary}>
        <Text style={styles.verifiedText}><FontAwesome5 style={styles.verified} name={'check-circle'} solid/> Signature Verified</Text>
      </View>
      <View style={styles.card}> 
        { qr.type === "BADGE" && <VaccineCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "COUPON" && <CouponCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "STATUS" && <StatusCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "PASSKEY" && <PassKeyCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "COWIN" && <CowinCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "FHIRBundle" && <SHCCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "DCC" && <DCCCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "UY" && <DCCUYCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "icao.vacc" && <VDSVAXCard detail={qr} colors={colors} removeItem={removeItem} /> }
        { qr.type === "icao.test" && <VDSTESTCard detail={qr} colors={colors} removeItem={removeItem} /> }
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: colors.primary}]}
        onPress={onPress}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      >
        <Text style={[styles.buttonText, { color: '#fff'}]}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const CARD_ROUNDED_CORNERS = 12.4;

const styles = StyleSheet.create({
	container: {
		flex: 1, 
    alignItems: 'center',
		justifyContent: 'center'
  }, 
  card:{
    borderRadius:12.4,
		width: '90%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 16,
    shadowOpacity: 0.58,
    shadowRadius: 16.00,  
	}, 
  verified: {
    fontSize: 30,
    color: '#fff',
  },
  verifiedText: {
    fontSize: 30,
    color: '#fff',
    justifyContent: 'center',
    paddingRight: 25,
  },
  verifiedPill: {
    marginTop: -70,
    borderRadius: 100,
    marginBottom: 30,
    paddingLeft: 15,
    paddingVertical: 8,
    elevation: 2, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00, 
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

export default QRResult;