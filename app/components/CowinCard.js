import React, {Component} from 'react';
import { StyleSheet, View, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

export default class CowinCard extends Component {

	showQR = (card) => {
    this.props.navigation.navigate({name: 'QRShow', params: {
        qr: card.rawQR, 
        title: card.cert.credentialSubject.name, 
        detail: card.cert.credentialSubject.id.substring(4),
        signedBy: "Signed by " + card.pub_key.toLowerCase() + " on " + Moment(card.cert.issuanceDate).format('MMM DD, YYYY')
      }
    });
  }

	render() {
		return (
			<TouchableOpacity onPress={() => this.showQR(this.props.detail)}>
				<View style={[styles.card, {backgroundColor:this.props.colors.primary}]}>
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Vaccine Record</Text>
						<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
					</View>

					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.title}>{this.props.detail.cert.credentialSubject.name}</Text>
					</View>

					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>{this.props.detail.cert.credentialSubject.age} year-old {this.props.detail.cert.credentialSubject.gender}</Text>
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
						<Text style={styles.notes}>Signed by {this.props.detail.pub_key.toLowerCase()} on {Moment(this.props.detail.cert.issuanceDate).format('MMM DD, YYYY')}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		borderWidth:0,
		borderRadius:12.4,
		padding: 15
	},
	divisor: {
		borderBottomColor: '#fff', 
		marginVertical:15
	},
	button:{
		color:'#fff',
		padding: 8,
		fontSize:18
	},
	icon:{
		color:'#fff',
		paddingRight: 8,
		fontSize:18
	},
	row:{
		flexDirection:'row', 
		justifyContent:'space-between'
	},
	title:{
		fontSize:38,
		color:'#fff', textTransform: 'capitalize'
	},
	notes: {
		fontSize: 18,
		color:'#fff'
	}, 
	notesCaps: {
		fontSize: 18,
		color:'#fff', 
		textTransform: 'capitalize'
	}
});