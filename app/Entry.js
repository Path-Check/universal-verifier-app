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
    console.log(e);
    this.setState(state => {
      const vaccines = state.vaccines.concat();
 
      return {
        vaccines
      };
    });
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onVaccineRead}
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
                renderItem={({item}) => <Text style={styles.itemStyle}>{item}</Text>}
                keyExtractor={item => item}
                /> 
          </View>
        }
      />
    );
  }
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    color: '#777',
  },
  sectionContainerFlex: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
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