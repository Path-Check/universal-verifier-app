import React, {Component} from 'react';
import { View, Image, Button, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { CardStyles as styles } from '../themes/CardStyles' 

import Moment from 'moment';

const TRUST_REGISTRY = {
	"k1.pathcheck.org": "State of Massachusetts", 
	"keys.gov.bm": "Country of Barbados"
}

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

	issuerName = (card) => {
		if (TRUST_REGISTRY[card.pub_key.toLowerCase()]) {
			return TRUST_REGISTRY[card.pub_key.toLowerCase()]
		}
		return card.pub_key.toLowerCase();
	}

	renderCard = () => {
		return (
			<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Badge</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>

				{ this.props.detail.vaccinee && this.certVacinee().name &&
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.title}>{this.certVacinee().name}</Text>
					</View>
				}

				{ this.props.detail.vaccinee && this.certVacinee().dob &&
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>DoB: {this.formatDoB(this.certVacinee().dob)}</Text>
					</View>
				}

				{ this.cert().name !== undefined && this.cert().name !== "" &&
					<View style={styles.row}>
						<Text style={styles.title}>{this.cert().name}</Text>
					</View>
				}

				{ this.cert().dob !== undefined && this.cert().dob !== "" &&
					<View style={styles.row}>
						<Text style={styles.notes}>DoB: {this.formatDoB(this.cert().dob)}</Text>
					</View>
				}

				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />

				<View style={styles.row}>
					<Text style={styles.notes}>Vaccination on {Moment(this.cert().date).format('MMM DD, YYYY')}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notesCaps}>{this.cert().manuf} {this.cert().product}</Text>
				</View>
				
				<View style={styles.row}>
					<Text style={styles.notes}>
							{this.format(["#"+this.cert().lot, this.cert().site, this.cert().route, this.cert().dose/1000 + "ml"])}
					</Text>
				</View>

				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:15}} />
				
				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>Signed by {this.issuerName(this.props.detail)}</Text>
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