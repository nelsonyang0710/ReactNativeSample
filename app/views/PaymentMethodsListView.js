"use strict";
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, ListView} from 'react-native';
import ViewContainer from '../components/ViewContainer';
class PaymentMethodsListView extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			message: null
		}
	}

	render() {
		return (
			<ViewContainer message={this.state.message}>
				<ListView dataSource={this.ds.cloneWithRows(this.props.paymentInfo)}
				          renderRow={(shippingInfo, sectionID, rowID, highlightRow) => this._renderShippingInfoRow(shippingInfo, sectionID, rowID, highlightRow)}
				          enableEmptySections={true} removeClippedSubviews={false}/>
			</ViewContainer>
		)
	}

	_renderShippingInfoRow(paymentInfo, sectionID, rowID, highlightRow) {
		return (
			<TouchableHighlight onPress={() => this.onPaymentInfoPressed(paymentInfo,rowID)} style={styles.touchable} underlayColor='#0070ba'>
				<View style={styles.touchableContainer}>
					<Text style={styles.touchableLeftArrow}>&lt;</Text>
					<View style={styles.touchableInnerText}>
						<Text style={styles.touchableH2}>{paymentInfo.name} {paymentInfo.number}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	onPaymentInfoPressed(paymentInfo, rowID) {
		var backupPaymentMethod = null;
		for (var index in this.props.paymentInfo)
		{
			if (index !== rowID)
			{
				backupPaymentMethod = this.props.paymentInfo[index]
			}
		}
		this.setState({message: ' '});
		this.props.previous.setState({selectedPaymentMethod:paymentInfo, backupPaymentMethod:backupPaymentMethod, message:null});
		this.props.navigator.pop();

	}
}

const styles = StyleSheet.create({
	touchable: {
		padding: 20
	},
	touchableH2: {
		fontSize: 20,
		paddingTop: 5,
		paddingBottom: 5
	},
	touchableContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	touchableInnerText: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	touchableLeftArrow: {
		color: '#0070ba',
		fontSize: 20,
		padding: 10,
		fontWeight: 'bold'
	},
});
module.exports = PaymentMethodsListView;