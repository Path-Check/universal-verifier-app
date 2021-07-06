import React, { useState, useEffect } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text, View, SafeAreaView,
  TouchableOpacity, Alert, 
  FlatList, StatusBar
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import NoCards from './../components/NoCards';
import CowinCard from './../components/CowinCard';
import VaccineCard from './../components/VaccineCard';
import CouponCard from './../components/CouponCard';
import StatusCard from './../components/StatusCard';
import PassKeyCard from './../components/PassKeyCard';
import SHCCard from './../components/SHCCard';
import { listCards, removeCard } from './../utils/StorageManager';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import { FloatingAction } from "react-native-floating-action";
import { useTheme } from '../themes/ThemeProvider';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import Moment from 'moment';

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
    let cards = await listCards();
    setCards(cards);
    setFilteredCards(filter(cards, search));
  };

  const removeItem = async (signature) => {
    const remaining = await removeCard(signature);
    setCards(remaining);
    setFilteredCards(filter(remaining, search));
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

        <SafeAreaView style={styles.flatList}>
          <View style={styles.border}>
            <FlatList 
              data={filteredCards} 
              keyExtractor={item => item.signature} 
              contentContainerStyle={filteredCards.length == 0 && styles.centerEmptySet}
              ListEmptyComponent={<NoCards colors={colors} />}
              renderItem={({item}) => {
                if (item.type === "BADGE")  
                  return <View style={styles.listItem}><VaccineCard detail={item} colors={colors} navigation={navigation} removeItem={removeItem} pressable/></View>
                if (item.type === "COUPON")  
                  return <View style={styles.listItem}><CouponCard detail={item} colors={colors} navigation={navigation} removeItem={removeItem} pressable/></View>
                if (item.type === "STATUS")  
                  return <View style={styles.listItem}><StatusCard detail={item} colors={colors} navigation={navigation} removeItem={removeItem} pressable/></View>
                if (item.type === "PASSKEY")  
                  return <View style={styles.listItem}><PassKeyCard detail={item} colors={colors} navigation={navigation} removeItem={removeItem} pressable/></View>
                if (item.type === "COWIN")  
                  return <View style={styles.listItem}><CowinCard detail={item} colors={colors} navigation={navigation} removeItem={removeItem} pressable/></View>
                if (item.type === "FHIRBundle")  
                  return <View style={styles.listItem}><SHCCard detail={item} colors={colors} navigation={navigation} removeItem={removeItem} pressable/></View>
              }} />
          </View>
        </SafeAreaView>

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
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    flex: 1
  },
  border: {
    paddingTop: 15,
  },
  flatList: {
    flex: 1
  },
  icon:{
		color:'#fff',
		paddingRight: 0,
		fontSize:25
	},
  listItem: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  centerEmptySet: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%'
  }
});

export default Entry;