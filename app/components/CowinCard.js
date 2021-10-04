import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

import { CardStyles as styles } from '../themes/CardStyles' 

const TRUST_REGISTRY = {
	"did:india": "Country of India"
	"did:srilanka:moh":  "Country of Sri Lanka"
}

export default class CowinCard extends Component {
	issuerName = (card) => {
		if (TRUST_REGISTRY[card.pub_key.toLowerCase()]) {
			return TRUST_REGISTRY[card.pub_key.toLowerCase()]
		}
		return card.pub_key.toLowerCase();
	}

	issuedAt = (card) => {
		return Moment(card.cert.issuanceDate).format('MMM DD, YYYY');
	}

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: card.cert.credentialSubject.name, 
        detail: card.cert.credentialSubject.id.substring(4),
        signedBy: this.issuerName(card) + " on " + this.issuedAt(card)
      }
    });
  }

	renderCard = () => {
		return (
			<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - COVID Vaccine</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.title}>{this.props.detail.cert.credentialSubject.name}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{this.props.detail.cert.credentialSubject.age} yrs-old {this.props.detail.cert.credentialSubject.gender}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>{this.props.detail.cert.credentialSubject.id.substring(4)}</Text>
				</View>
				
				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />

				<FlatList 
					data={this.props.detail.cert.evidence} 
					keyExtractor={item => item.certificateId} 
					renderItem={({item}) => {
							return (	<View>
							<View style={styles.row}>
								<Text style={styles.notes}>Shots taken: {item.dose} of {item.totalDoses}</Text>
							</View>
							
							<View style={styles.row}>
								<Text style={styles.notes}>
										Vaccine: {item.vaccine} #{item.batch}
								</Text>
							</View>
								
							<View style={styles.row}>
								<Text style={styles.notes}>
										{item.manufacturer}
								</Text>
							</View>
							</View>)
					}} />
					
				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />
				
				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>{this.issuerName(this.props.detail)} on {this.issuedAt(this.props.detail)}</Text>
				</View>
			</View>
		)
	}

	render() {
		return this.props.pressable ? 
		( <TouchableOpacity onPress={() => this.showQR(this.props.detail)}>
				{this.renderCard()}
			</TouchableOpacity>
		) : this.renderCard();
	}
}