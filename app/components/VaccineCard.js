import React, {Component} from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

export default class VaccineCard extends Component {

  format = (list) => {
		const noUndefinedList = list.filter(item => item);
    return noUndefinedList.join(', ');
  }

	formatDoB = (dob) => {
		if (dob === undefined || dob === "") return "";
		return Moment(dob).format('MMM DD, YYYY')
	}

	render() {
		return (
			<Card containerStyle={styles.card}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Badge</Text>
					<FontAwesome5 style={styles.button} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.time}>{this.props.detail.manuf} {this.props.detail.product}</Text>
				</View>

				{ this.props.detail.vaccinee && this.props.detail.vaccinee.name &&
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notesCaps}>{this.props.detail.vaccinee.name}, {this.formatDoB(this.props.detail.vaccinee.dob)}</Text>
					</View>
				}

				{ this.props.detail.name !== undefined && this.props.detail.name !== "" &&
				<View style={styles.row}>
					<Text style={styles.notesCaps}>{this.props.detail.name}, {this.formatDoB(this.props.detail.dob)}</Text>
				</View>
				}
				<View style={styles.row}>
					<Text style={styles.notes}>Shot taken on {Moment(this.props.detail.date).format('MMM DD, YYYY')}</Text>
				</View>
				
				<View style={styles.row}>
					<Text style={styles.notes}>
					    {this.format([this.props.detail.site, this.props.detail.route, this.props.detail.dose])}
					</Text>
				</View>

				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:15}} />
				
				<View style={{flexDirection:'row', alignItems: 'center'}}>
					<FontAwesome5 style={styles.icon} name={'check-circle'} solid/>
					<Text style={styles.notes}>Signed by {this.props.detail.pub_key.toLowerCase()}</Text>
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
	button:{
		backgroundColor:"#00000000",
		color:'#fff',
		paddingRight: 8,
		paddingLeft: 18,
		fontSize:18
	},
	icon:{
		backgroundColor:"#00000000",
		color:'#fff',
		paddingRight: 8,
		fontSize:18
	},
	row:{
		flexDirection:'row', 
		justifyContent:'space-between'
	},
	time:{
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