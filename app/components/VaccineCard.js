import React, {Component} from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import Moment from 'moment';

export default class ForecastCard extends Component {
	render() {
		return (
			<Card containerStyle={styles.card}>
				<Text style={styles.notes}>{Moment(this.props.detail.date).format('MMM DD, ha')}</Text>
				
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.time}>{this.props.detail.manufacturer} {this.props.detail.type}</Text>
				</View>

				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>{this.props.detail.vaccinee}</Text>
				</View>
				
				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>{this.props.detail.site}, {this.props.detail.route}, {this.props.detail.dose}ml</Text>
				</View>

				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:15}} />
				
				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>Signed By {this.props.detail.vaccinator}, approved by the FDA</Text>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'rgba(56, 172, 236, 1)',
		borderWidth:0,
		borderRadius:20
	},
	time:{
		fontSize:38,
		color:'#fff'
	},
	notes: {
		fontSize: 18,
		color:'#fff'
	}
});