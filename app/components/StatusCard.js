import React, {Component} from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Moment from 'moment';

export default class StatusCard extends Component {

  format = (list) => {
		const noUndefinedList = list.filter(item => item);
    return noUndefinedList.join(', ');
  }

	formatDoses = (doses) => {
		if (parseInt(doses) === 2) return "Fully Vaccinated";
		if (parseInt(doses) === 1) return "Mid-vaccination";
		return "Not Vaccinated";
  }

	render() {
		return (
			<Card containerStyle={styles.card}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Status</Text>
					<FontAwesome5 style={styles.icon} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>
				
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.time}>{this.formatDoses(this.props.detail.vaccinated)}</Text>
				</View>

				{ this.props.detail.initials !== "" &&
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notes}>Initials: {this.props.detail.initials}</Text>
					</View>
				}

				{ this.props.detail.vaccinee && this.props.detail.vaccinee.name &&
					<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={styles.notesCaps}>{this.props.detail.vaccinee.name}, {Moment(this.props.detail.vaccinee.dob).format('MMM DD, YYYY')}</Text>
					</View>
				}

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
	icon:{
		backgroundColor:"#00000000",
		color:'#fff',
		paddingRight: 8,
		fontSize:18
	},
	time:{
		fontSize:38,
		color:'#fff'
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