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

	cert = () => {
		return this.props.detail.cert ? this.props.detail.cert : this.props.detail;
	}

	certVacinee = () => {
		return this.props.detail.vaccinee.cert ? this.props.detail.vaccinee.cert : this.props.detail.vaccinee;
	}

	render() {
		return (
			<Card containerStyle={styles.card}>
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.notes}>{Moment(this.props.detail.scanDate).format('MMM DD, hh:mma')} - Status</Text>
					<FontAwesome5 style={styles.icon} name={'trash'} onPress={() => this.props.removeItem(this.props.detail.signature)} solid/>
				</View>
				
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Text style={styles.time}>{this.formatDoses(this.cert().status)}</Text>
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