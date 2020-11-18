import React, { useState, useEffect } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text, View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import VaccineCard from './../components/VaccineCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

import { FloatingAction } from "react-native-floating-action";

function Entry({ navigation }) {
  const [vaccines, setVaccines] = useState([]);
  const isFocused = useIsFocused();

  const onNewVaccine = (e) => {
    navigation.navigate('QRReader')
  }

  const actions = [{
      text: "New Vaccine",
      icon:  <FontAwesome5 name={'syringe'} style={styles.icon} solid />,
      name: "bt_vaccine",
      position: 0
    }
  ];

  const load = async () => {
    try {
      let ks = await AsyncStorage.getAllKeys();
      let curated =  ks.filter((key) => key.startsWith('CARDS'));
      let vaccinesStr = await AsyncStorage.multiGet(curated);
      let vaccines = [];
      vaccinesStr.forEach((item) =>
          vaccines.push(JSON.parse(item[1]))
      );
      // sort descending
      vaccines = vaccines.sort((a,b) => new Date(b.date) - new Date(a.date));
      setVaccines(vaccines);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    load();
    console.log("useEffect Called");
  }, [isFocused]);

  const onDelete = (e) => {
    console.log("OnDelete");
		AsyncStorage.clear();
    load();
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={vaccines} 
        keyExtractor={item => item.signature} 
        renderItem={({item}) => <VaccineCard detail={item} />} />

      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        onPressItem={onNewVaccine}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
  icon:{
		color:'#fff',
		paddingRight: 0,
		fontSize:25
	}
});

export default Entry;