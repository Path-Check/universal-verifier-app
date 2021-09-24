import React, {Component} from 'react';
import { View, Image, Button, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

import { CardStyles as styles } from '../themes/CardStyles' 

export default class PassKeyCard extends Component {

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: this.cert().name, 
        detail: "DoB: " + Moment(this.cert().dob).format('MMM DD, YYYY'),
        signedBy: "Signed by " + card.pub_key.toLowerCase() + " on " + Moment(card.cert.issuanceDate).format('MMM DD, YYYY')
      }
    });
  }

  format = (list) => {
		const noUndefinedList = list.filter(item => item);
    return noUndefinedList.join(', ');
  }

	cert = () => {
		return this.props.detail.cert ? this.props.detail.cert : this.props.detail;
	}

	renderCard = () => {
		return (
			<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - PassKey</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>
				
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.title}>{this.cert().name}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>DoB: {Moment(this.cert().dob).format('MMM DD, YYYY')}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>Phone: {this.cert().phone}</Text>
				</View>

				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:15}} />
				
				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>Signed by {this.props.detail.pub_key.toLowerCase()}</Text>
				</View>
			</View>
		);
	}


	render() {
		return this.props.pressable ? 
		( <TouchableOpacity onPress={() => this.showQR(this.props.detail)}>
				{this.renderCard()}
			</TouchableOpacity>
		) : this.renderCard();
	}
}