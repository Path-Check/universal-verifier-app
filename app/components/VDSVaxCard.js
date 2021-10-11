import React, {Component} from 'react';
import { View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { CardStyles as styles } from '../themes/CardStyles' 

import Moment from 'moment';

const DISEASE = {
	"RA01":"COVID-19", 
	"RA01.0":"COVID-19"
};

const VACCINE_TYPES = {
	"XM68M6": "Unspecified",
	"XM1NL1": "Inactivated virus",
	"XM5DF6": "Live attenuated virus", 
	"XM9QW8": "Non-replicating viral vector", 
	"XM0CX4": "Replicating viral vector",
	"XM5JC5": "Virus protein subunit",
	"XM1J92": "Virus-like particle (VLP)", 
	"XM6AT1": "DNA based", 
	"XM0GQ8": "RNA based"
}

const TRUST_REGISTRY = {
	"AUS": "Gov of Australia"
}

export default class VDSVaxCard extends Component {

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

	formatDoB = () => {
		if (this.cert().data.msg.pid.dob === undefined || this.cert().data.msg.pid.dob === "") return "";
		return "DoB: " + Moment(this.cert().data.msg.pid.dob).format('MMM DD, YYYY')
	}

	formatCI = () => {
		return "ID: " + this.cert().data.msg.pid.i;
	}

	formatUVCI = () => {
		return "Vax ID: " + this.cert().data.msg.uvci;
	}

	formatExpiresOn = () => {
		if (this.cert().exp === undefined || this.cert().exp === "") return "";
		return Moment(this.cert().exp*1000).format('MMM DD, YYYY')
	}

	formatPerson = () => {
		if (this.cert().data.msg.pid.n) {
			let name = this.cert().data.msg.pid.n.replace("  ", ", "); 
			names = name.split(" "); 
			for (i=2; i<names.length; i++) {
				names[i] = names[i][0];
			}
			return names.join(" ");
		} else
			return "Unkown";
	}

	formatSignedBy = () => {
		let line = "Signed by ";
		if (this.cert().data.hdr.is) 
		 	if (TRUST_REGISTRY[this.cert().data.hdr.is])
			 	line += TRUST_REGISTRY[this.cert().data.hdr.is]
			else
				line += this.cert().data.hdr.is;
		else 
			line += this.props.detail.pub_key.toLowerCase();

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
					<Text style={styles.notes}>{this.formatDoB()}. {this.formatCI()}</Text>
				</View>

				<View style={styles.row}>
					<Text style={styles.notes}>{this.formatUVCI()}</Text>
				</View>

				<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />

				<FlatList 
				  listKey={this.props.detail.signature+"ve"}
					data={this.cert().data.msg.ve} 
					keyExtractor={item => this.props.detail.signature+item.nam} 
					renderItem={({item}) => {
						return (	
							<View style={styles.groupLine}>
							
								<FlatList 
										listKey={this.props.detail.signature+item.nam+"vd"}
										data={item.vd} 
										keyExtractor={subitem => this.props.detail.signature+item.nam+subitem.dvc} 
										renderItem={ (subitem) => {
											return (	
												<View style={styles.groupLine}>
													
													<View  style={{alignItems: 'center'}}>
														<Text style={styles.subtitle}>{DISEASE[item.dis]} Vaccine {subitem.item.seq}</Text>
													</View>
												
													<View  style={{alignItems: 'center'}}>
														<Text style={styles.notes}>{item.nam} (#{subitem.item.lot})</Text>
													</View>

													<View  style={{alignItems: 'center'}}>
														<Text style={styles.notes}>Date: {subitem.item.dvc}</Text>
													</View>

													<View  style={{alignItems: 'center'}}>
														<Text style={styles.notes}>Location: {subitem.item.adm}, {subitem.item.ctr}</Text>
													</View>

													<Divider style={[styles.divisor, {borderBottomColor:this.props.colors.cardText}]} />
												</View>
											)
										}} />
							</View>
						)
					}} />	
				
				<View style={{flexDirection:'row', alignItems: 'center', paddingRight: 10}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>{this.formatSignedBy()}</Text>
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