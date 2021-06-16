import React, {Component} from 'react';
import { View, Image, Button, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { CardStyles as styles } from '../themes/CardStyles' 

import Moment from 'moment';

export default class VaccineCard extends Component {

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: this.formatVacinee(), 
        detail: this.cert().manuf + " " + this.cert().product,
        signedBy: "Signed by " + card.pub_key.toLowerCase() + " on " + Moment(card.cert.issuanceDate).format('MMM DD, YYYY')
      }
    });
  }

  format = (list) => {
		const noUndefinedList = list.filter(item => item);
    return noUndefinedList.join(', ');
  }

	formatDoB = (dob) => {
		if (dob === undefined || dob === "") return "";
		return Moment(dob).format('MMM DD, YYYY')
	}

	cert = () => {
		return this.props.detail.cert ? this.props.detail.cert : this.props.detail;
	}

	certVacinee = () => {
		return this.props.detail.vaccinee.cert ? this.props.detail.vaccinee.cert : this.props.detail.vaccinee;
	}

	formatVacinee = () => {
		if (this.cert().name && this.cert().name !== "") {
			return this.cert().name;
		} else if (this.props.detail.vaccinee && this.certVacinee().name) {
			return this.certVacinee().name;
		} else {
			let hash = this.cert().passkey.toUpperCase();
			let simpleHash = hash.substring(0,5) +"..."+ hash.substring(hash.length-5,hash.length);
			return "User: " + simpleHash;
		}
	}

	render() {
		return (
			<TouchableOpacity onPress={() => this.showQR(this.props.detail)}>
				<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Badge</Text>
						<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
					</View>

					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.title}>{this.cert().manuf} {this.cert().product}</Text>
					</View>

					{ this.props.detail.vaccinee && this.certVacinee().name &&
						<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
							<Text style={styles.notesCaps}>{this.certVacinee().name}, {this.formatDoB(this.certVacinee().dob)}</Text>
						</View>
					}

					{ this.cert().name !== undefined && this.cert().name !== "" &&
					<View style={styles.row}>
						<Text style={styles.notesCaps}>{this.cert().name}, {this.formatDoB(this.cert().dob)}</Text>
					</View>
					}
					<View style={styles.row}>
						<Text style={styles.notes}>Shot taken on {Moment(this.cert().date).format('MMM DD, YYYY')}</Text>
					</View>
					
					<View style={styles.row}>
						<Text style={styles.notes}>
								{this.format([this.cert().site, this.cert().route, this.cert().dose])}
						</Text>
					</View>

					<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:15}} />
					
					<View style={{flexDirection:'row', alignItems: 'center'}}>
						<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
						<Text style={styles.notes}>Signed by {this.props.detail.pub_key.toLowerCase()}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}