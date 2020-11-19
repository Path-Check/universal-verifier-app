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
import { SearchBar } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import {useTheme} from '../themes/ThemeProvider';

function Entry({ navigation }) {
  const [vaccines, setVaccines] = useState([]);
  const [filteredVaccines, setFilteredVaccines] = useState([]);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();
  const {colors, isDark} = useTheme();

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

  const filter = (vaccines, text) => {
    if (text && text.length > 0) { 
      const lowerText = text.toLowerCase();
      return vaccines.filter(function (item) {
          return (item.vaccinee && item.vaccinee.toLowerCase().includes(lowerText))
              || (item.vaccinator && item.vaccinator.toLowerCase().includes(lowerText));
        });
    } else {
      return vaccines;
    }
  }

  const searchFilter = (text) => {
    setFilteredVaccines(filter(vaccines, text));
    setSearch(text);
  }

  const load = async () => {
    try {
      let ks = await AsyncStorage.getAllKeys();
      let curated =  ks.filter((key) => key.startsWith('CARDS'));
      let vaccinesStr = await AsyncStorage.multiGet(curated);
      let vaccines = [];
      vaccinesStr.forEach((item) =>
          vaccines.push(JSON.parse(item[1]))
      );
      vaccines = vaccines.sort((a,b) => new Date(b.scanDate) - new Date(a.scanDate));
      setVaccines(vaccines);
      setFilteredVaccines(filter(vaccines, search));
    } catch (err) {
      alert(err);
    }
  };

  const removeItem = (signature) => {
    AsyncStorage.removeItem('CARDS'+signature);
    const removedVaccine = vaccines.filter(item => item.signature !== signature);
    setVaccines(removedVaccine);
    setFilteredVaccines(filter(removedVaccine, search));
    console.log("RemoveItem" + signature);
  }

  useEffect(() => {
    load();
    console.log("useEffect Called");
  }, [isFocused]);

  return (
    <View style={styles.container} backgroundColor={colors.background}>
      <SearchBar round lightTheme={!isDark}
          placeholder="Type Here..."
          onChangeText={text => searchFilter(text)}
          value={search}
          inputContainerStyle={styles.searchBarStyle}
        />

      <FlatList 
        data={filteredVaccines} 
        keyExtractor={item => item.signature} 
        renderItem={({item}) => <VaccineCard detail={item} removeItem={removeItem} />} />

      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        onPressItem={onNewVaccine}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarStyle: {
    marginLeft: 7,
    marginRight: 7
  },
  container: {
    flex: 1
  },
  icon:{
		color:'#fff',
		paddingRight: 0,
		fontSize:25
	}
});

export default Entry;