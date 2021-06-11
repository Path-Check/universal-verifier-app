import React, { useState, useEffect } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text, View,
  TouchableOpacity,
  FlatList, StatusBar
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import CowinCard from './../components/CowinCard';
import VaccineCard from './../components/VaccineCard';
import CouponCard from './../components/CouponCard';
import StatusCard from './../components/StatusCard';
import PassKeyCard from './../components/PassKeyCard';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import {useTheme} from '../themes/ThemeProvider';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

function Entry({ navigation }) {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
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

  const filter = (cards, text) => {
    if (text && text.length > 0) { 
      const lowerText = text.toLowerCase();
      return cards.filter(function (item) {
          return JSON.stringify(item).toLowerCase().includes(lowerText);
        });
    } else {
      return cards;
    }
  }

  const searchFilter = (text) => {
    setFilteredCards(filter(cards, text));
    setSearch(text);
  }

  const load = async () => {
    try {
      let ks = await AsyncStorage.getAllKeys();
      let curated =  ks.filter((key) => key.startsWith('CARDS'));
      let cardsStr = await AsyncStorage.multiGet(curated);
      let cards = [];
      cardsStr.forEach((item) =>
          cards.push(JSON.parse(item[1]))
      );
      cards = cards.sort((a,b) => new Date(b.scanDate) - new Date(a.scanDate));
      console.log(cards);
      setCards(cards);
      setFilteredCards(filter(cards, search));
    } catch (err) {
      alert(err);
    }
  };

  const removeItem = async (signature) => {
    const toRemove = cards.filter(item => item.signature === signature);
    if (toRemove[0] && toRemove[0].hash) {
      await AsyncStorage.removeItem('HASH'+toRemove[0].hash);

      const removeHashReferences = cards.filter(item => item.passkey === toRemove[0].hash);
      removeHashReferences.forEach(async (item) => {
            let cardStr = await AsyncStorage.getItem('CARDS'+item.signature);
            console.log(cardStr);
            let card = JSON.parse(cardStr);
            card.vaccinee = null;
            item.vaccinee = null;
            await AsyncStorage.setItem('CARDS'+card.signature, JSON.stringify(card)); 
          }
      );
    }

    await AsyncStorage.removeItem('CARDS'+signature);
    const removedVaccine = cards.filter(item => item.signature !== signature);
    setCards(removedVaccine);
    setFilteredCards(filter(removedVaccine, search));
    console.log("RemoveItem" + signature);
  }

  useEffect(() => {
    changeNavigationBarColor(colors.background, !isDark);
    load();
  }, [isFocused]);

  return (
    <View style={styles.container} backgroundColor={colors.background}>
      <StatusBar 
        backgroundColor={colors.background}
        barStyle={isDark ? "light-content" : "dark-content"}/>

      <SearchBar round lightTheme={!isDark}
          containerStyle={{backgroundColor:colors.background, 
                           borderBottomColor: colors.divisor,  
                           borderTopColor: colors.background, paddingBottom: 4, paddingTop: 0}}
          placeholder="Search Here..."
          onChangeText={text => searchFilter(text)}
          value={search}
          inputContainerStyle={{marginLeft: 7, marginRight: 7, backgroundColor:colors.background}}
        />

      <FlatList 
        data={filteredCards} 
        keyExtractor={item => item.signature} 
        renderItem={({item}) => {
          console.log(item.signature);
          if (item.type === "BADGE")  
             return <VaccineCard detail={item} removeItem={removeItem} />
          if (item.type === "COUPON")  
             return <CouponCard detail={item} removeItem={removeItem} />
          if (item.type === "STATUS")  
             return <StatusCard detail={item} removeItem={removeItem} />
          if (item.type === "PASSKEY")  
             return <PassKeyCard detail={item} removeItem={removeItem} />
          if (item.type === "COWIN")  
             return <CowinCard detail={item} removeItem={removeItem} />
        }} />

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
    paddingTop: (Platform.OS === 'ios') ? 40 : 0,
    flex: 1
  },
  icon:{
		color:'#fff',
		paddingRight: 0,
		fontSize:25
	}
});

export default Entry;