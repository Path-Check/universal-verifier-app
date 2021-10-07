import { StyleSheet } from 'react-native';

const CardStyles = StyleSheet.create({
	card: {
		borderWidth:0,
		borderRadius:12.4,
		padding: 15
	},
	divisor: {
		borderBottomColor: '#fff', 
		marginVertical:15
	},
	button: {
		color:'#fff',
		padding: 8,
		fontSize:18
	},
	icon: {
		color:'#fff',
		paddingRight: 8,
		fontSize:18
	},
	row: {
		flexDirection:'row', 
		justifyContent:'space-between'
	},
	groupLine: {
		paddingBottom: 0
	},
	title: {
		fontSize:30,
		color:'#fff', textTransform: 'capitalize'
	},
	subtitle: {
		fontSize:26,
		color:'#fff',
	},
	notes: {
		fontSize: 18,
		color:'#fff'
	}, 
	notesCenter: {
		fontSize: 18,
		color:'#fff',
		textAlign: 'center'
	}, 
	notesSmall: {
		fontSize: 13,
		color:'#fff'
	}, 
	notesCaps: {
		fontSize: 18,
		color:'#fff', 
		textTransform: 'capitalize'
	}
});

export { CardStyles }