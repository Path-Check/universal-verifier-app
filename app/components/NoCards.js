import React, {Component} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Text, Divider } from 'react-native-elements';

export default class NoCards extends Component {
	render() {
		return (
			<SafeAreaView style={styles.container} backgroundColor={this.props.colors.background}>
        <View style={styles.card} borderColor={this.props.colors.divisor} >
						<Divider style={styles.line} borderColor={this.props.colors.divisor} />
						<View style={styles.bottomContainer}>
							<View style={styles.column1}>
								<View style={styles.leftSquare} borderColor={this.props.colors.divisor} />
							</View>
        			<View style={styles.column2}>
								<Divider style={[styles.line, styles.lineRound, styles.lineShort]} borderColor={this.props.colors.divisor} />
								<Divider style={[styles.line, styles.lineRound]} borderColor={this.props.colors.divisor} />
								<Divider style={[styles.line, styles.lineRound]} borderColor={this.props.colors.divisor} />
							</View>
						</View>
				</View>

				<Text style={[styles.notes,{color:this.props.colors.divisor}]}>Passports you scan will appear here.</Text>
			</SafeAreaView>
		);
	}
}

const CARD_BORDER_WIDTH = 7;
const CARD_ROUNDED_CORNERS = 12.4;

const styles = StyleSheet.create({
	container: {
		flex: 1, 
    alignItems: 'center',
		justifyContent: 'center'
  },
	bottomContainer: {
    flex: 1, 
		flexDirection: 'row',
		padding: '2%'
  },
	column1: {
		width: '40%',
		padding: '7%',
  },
	column2: {
		width: '60%',
		padding: '7%',
  },
	leftSquare:{
		borderWidth: CARD_BORDER_WIDTH,
		borderRadius: CARD_ROUNDED_CORNERS,
		width: '100%',
		height: '100%',
		aspectRatio: 1
	}, 
	card:{
		borderWidth: CARD_BORDER_WIDTH,
		borderRadius: CARD_ROUNDED_CORNERS,
		width: '50%',
		aspectRatio: 1.5
	}, 
	line:{
		borderBottomWidth: 0,
		marginTop: '14%', 
		borderWidth: CARD_BORDER_WIDTH, 
	},  
	lineShort:{
		width: '60%'
	}, 
	lineRound: {
		borderRadius: CARD_ROUNDED_CORNERS,
	},
	notes: {
		marginTop: '4%',
		fontSize: 16,
		fontWeight: 'bold',
		lineHeight: 24
	}, 
});