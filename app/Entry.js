import React, {Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text, View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import RNSimpleCrypto from "react-native-simple-crypto";
import Moment from 'moment';

const PUB_KEY = "-----BEGIN PUBLIC KEY-----\n"+
"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN\n"+
"FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76\n"+
"xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4\n"+
"gwQco1KRMDSmXSMkDwIDAQAB\n"+
"-----END PUBLIC KEY-----\n";

class Entry extends Component {
  constructor(props) {
        super(props);
        this.state = {
            vaccines:[]
        }
  }

  onVaccineRead = async (e) => {
    const msg = e.data.split("?");
    const what = msg[0].split(":");
    if (what[0] != "vaccine") {
      return;
    }

    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while (match = regex.exec(e.data)) {
      params[match[1]] = match[2];
    }
    console.log(params);

    const message = e.data.replace("&signed="+params.signed, "");              
    const signedCert = params.signed;
    const validSignature2 = await RNSimpleCrypto.RSA.verify(
      signedCert,
      message,
      PUB_KEY,
      "SHA256"
    );

    var vaccine = { type: what[1] + " " + what[0], 
                date: params.date, 
                manufacturer: params.manuf, 
                lot: params.lot,
                route: params.route,
                site: params.site,
                vaccinee: params.vaccinee, 
                vaccinator: params.vaccinator,
                signature: params.signed, 
                verified: validSignature2 ? "Valid" : "Not Valid" };

    
    this.setState(state => {
      const vaccines = [vaccine];
 
      return {
        vaccines
      };
    });
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onVaccineRead}
        reactivate={true}
        reactivateTimeout={5000}
        cameraStyle={styles.cameraStyle}
        topContent={
          <Text style={styles.centerText}>
            Load your Vacccine Certificate via the QR Code Reader below. 
          </Text>
        }
        bottomContent={
          <View style={styles.sectionContainerFlex}>
            <Text style={styles.sectionTitle}>Verified Vaccines</Text>
            <FlatList
                data={this.state.vaccines}
                renderItem={({item}) => <Text style={styles.itemStyle}>{item.manufacturer} {item.type} by {item.vaccinator} given to {item.vaccinee} on {item.date} - {item.verified}</Text>}
                keyExtractor={item => item.date}
                /> 
          </View>
        }
      />
    );
  }
};

const styles = StyleSheet.create({
  centerText: {
    flex: 0,
    fontSize: 18,
    padding: 30,
    color: '#777',
  },
  cameraStyle: {
    flex: 1,
    marginTop: -20,
    margin: 60,
    width: 300,
  },
  sectionContainerFlex: {
    flex: 0,
    marginTop: 12,
    marginBottom: 12,
    height: 200,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'center'
  },
  itemStyle: {
      padding: 3,
      fontSize: 18,
      fontWeight: '400',
  }
});

export default Entry;