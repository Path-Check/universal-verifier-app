import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

import { CardStyles as styles } from '../themes/CardStyles' 

export default class StatusCard extends Component {

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: this.formatVacinee(), 
        detail: "Vaccine Status: " + this.formatDoses(this.cert().status),
        signedBy: "Signed by " + card.pub_key.toLowerCase() + " on " + Moment(card.cert.issuanceDate).format('MMM DD, YYYY')
      }
    });
  }

  format = (list) => {
		const noUndefinedList = list.filter(item => item);
    return noUndefinedList.join(', ');
  }

	formatDoses = (doses) => {
		if (parseInt(doses) === 2) return "Fully Vaccinated";
		if (parseInt(doses) === 1) return "Mid-vaccination";
		return "Not Vaccinated";
  }

	cert = () => {
		return this.props.detail.cert ? this.props.detail.cert : this.props.detail;
	}

	certVacinee = () => {
		return this.props.detail.vaccinee.cert ? this.props.detail.vaccinee.cert : this.props.detail.vaccinee;
	}

	formatVacinee = () => {
		if (this.cert().initials && this.cert().initials !== "") {
			return this.cert().initials;
		} else if (this.props.detail.vaccinee && this.certVacinee().name) {
			return this.certVacinee().name;
		} else {
			let hash = this.cert().passkey.toUpperCase();
			let simpleHash = hash.substring(0,5) +"..."+ hash.substring(hash.length-5,hash.length);
			return "User: " + simpleHash;
		}
	}

	renderCard = () => {
		return (
			<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Status</Text>
					<FontAwesome5 style={styles.icon} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>
				
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.title}>{this.formatDoses(this.cert().status)}</Text>
				</View>

				{ this.cert().initials && this.cert().initials !== "" &&
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>Initials: {this.cert().initials}</Text>
					</View>
				}

				{ this.props.detail.vaccinee && this.certVacinee().name &&
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notesCaps}>{this.certVacinee().name}, {Moment(this.certVacinee().dob).format('MMM DD, YYYY')}</Text>
					</View>
				}

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
