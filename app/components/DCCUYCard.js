import React, {Component} from 'react';
import { View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { CardStyles as styles } from '../themes/CardStyles' 

import Moment from 'moment';

   
export default class DCCYUCard extends Component {

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: this.formatPerson(), 
        detail: this.formatCI(),
        signedBy: this.formatSignedBy()
      }
    });
  }

	cert = () => {
		return this.props.detail.cert ? this.props.detail.cert : this.props.detail;
	}

	formatCI = () => {
		return this.cert().data.DocumentType + ": " + this.cert().data.DocumentNumber;
	}

	formatExpiresOn = () => {
		if (this.cert().exp === undefined || this.cert().exp === "") return "";
		return Moment(this.cert().exp*1000).format('MMM DD, YYYY')
	}

	formatPerson = () => {
		if (this.cert().data.Name)
			return this.cert().data.Name;
		else
			return "Unkown";
	}

	formatSignedBy = () => {
		let line = "Signed by ";
		if (this.cert().iss) 
			line += this.cert().iss;
		else 
			line += this.props.detail.pub_key.toLowerCase();

		if (this.cert().iat) {
			line += " on " + Moment(this.cert().iat * 1000).format('MMM DD, YYYY')
		}

		return line;
	}

	renderCard = () => {
		return (
			<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Vaccination</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>
				
				<View style={styles.row}>
					<Text style={styles.title}>{this.formatPerson()}</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.notes}>{this.formatCI()}</Text>
				</View>

				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />

				<FlatList 
				  listKey={this.props.detail.signature+"v"}
					data={this.cert().data.VaccinationInfo.Doses} 
					keyExtractor={item => (this.props.detail.signature+item.Date)} 
					renderItem={({item}) => {
						return (	
							<View style={styles.groupLine}>

								<View>
									<Text style={styles.notes}>Shot {item.Number}/{this.cert().data.VaccinationInfo.Doses.length}: {Moment(item.Date).format('MMM DD, YYYY')}</Text>
								</View>
								
								<View>
									<Text style={styles.notes}>Brand: {item.Vaccine}</Text>
								</View>
								<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />
							</View>
						)
					}} />							
				
				<View style={{flexDirection:'row', alignItems: 'center', paddingRight: 10}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>{this.formatSignedBy()}</Text>
				</View>

				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'clock'} solid/>
					<Text style={styles.notes}>Valid until: {this.formatExpiresOn()}</Text>
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