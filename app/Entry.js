import React, {Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text, View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

class Entry extends Component {
  constructor(props) {
        super(props);
        this.state = {
            vaccines:[]
        }
  }

  onVaccineRead = (e) => {
    const vaccineInfo = e.data.split("|");
    const vaccine = { type: vaccineInfo[0], 
                    date: vaccineInfo[1], 
                    manufacturer: vaccineInfo[2], 
                    lot: vaccineInfo[3],
                    route: vaccineInfo[4],
                    site: vaccineInfo[5],
                    user: vaccineInfo[6] };


    console.log(e.data.split("|"));
    this.setState(state => {
      const vaccines = state.vaccines.concat([vaccine]);
 
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
            <Text style={styles.sectionTitle}>Vaccine Certificates</Text>
            <FlatList
                data={this.state.vaccines}
                renderItem={({item}) => <Text style={styles.itemStyle}>{item.date} - {item.manufacturer}</Text>}
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