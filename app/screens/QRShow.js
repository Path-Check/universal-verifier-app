import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

import {useTheme} from '../themes/ThemeProvider';
import Moment from 'moment';

const screenWidth = Math.round(Dimensions.get('window').width)-50;

function QRShow({ navigation, route }) {
  const {colors} = useTheme();
  const [qrSize, setQRSize] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.background }, 
      headerTintColor: colors.text
    });
  });

  onPageLayout = (event) => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setQRSize(width);
  }; 

  return (
    <View style={styles.container} backgroundColor={colors.background}>
      <View style={styles.card} backgroundColor={colors.showQRBackground}> 
        <View style={styles.topView} onLayout={onPageLayout}> 
          <Text style={[styles.title,{color:colors.showQRText}]}>{route.params.title}</Text>
          <Text style={[styles.detail,{color:colors.showQRText}]}>{route.params.detail}</Text>
        </View>
        <Divider style={[styles.divisor, {borderBottomColor:colors.divisor}]} />
        <View style={styles.bottomView} onLayout={onPageLayout}> 
          <QRCode
            value={route.params.qr}
            size={qrSize}
            color={colors.primary}
          />
        </View>
      </View>

      <Text style={[styles.notes,{color:colors.showQRText}]}>{route.params.signedBy}</Text>
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
		borderRadius: CARD_ROUNDED_CORNERS,
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
  topView: {
    margin:20
  }, 
  bottomView: {
    margin:20
  }, 
	divisor: {
		borderBottomColor: 'rgba(55, 66, 87, 1)', 
    borderBottomWidth: 0.5
	}, 
  title:{
		fontSize:28,
    lineHeight: 32,
    fontWeight: 'bold',
	},
	detail: {
    marginTop: 5,
		fontSize: 16,
		fontWeight: 'bold',
		lineHeight: 24,
	}, 
  notes: {
		marginTop: '8%',
		fontSize: 14,
		lineHeight: 16,
    opacity: 0.56
	},
});

export default QRShow;