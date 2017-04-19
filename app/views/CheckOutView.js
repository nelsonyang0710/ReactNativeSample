"use strict";
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, ScrollView, Alert} from 'react-native';
import ViewContainer from '../components/ViewContainer';
import CustomerInfo from '../service/CustomerInfoService';
class CheckOutView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedShippingInfo: null,
			selectedPaymentMethod: null,
			backupPaymentMethod: null,
			total: 0,
			message:'loading...',
		}
	}

	componentDidMount() {
		CustomerInfo.getInfoFromAPI()
			.then((responseJson) => {
				this.shippingInfo = responseJson.ShipTo;
				this.paymentInfo = responseJson.PayWith;
				var selectedShippingInfo = null;
				var selectedPaymentMethod = null;
				var backupPaymentMethod = null;
				if (responseJson.ShipTo && responseJson.ShipTo.length > 0) {
					responseJson.ShipTo.map(function (shippingInfo) {
						if (shippingInfo.type === 'primary') {
							selectedShippingInfo = shippingInfo;
						}
					});
				}
				if (responseJson.PayWith && responseJson.PayWith.length > 0) {
					responseJson.PayWith.map(function (paymentMethod) {
						if (paymentMethod.type === 'primary') {
							selectedPaymentMethod = paymentMethod;
						}
						else {
							backupPaymentMethod = paymentMethod;
						}
					});
				}
				this.setState({
					selectedShippingInfo: selectedShippingInfo,
					selectedPaymentMethod: selectedPaymentMethod,
					backupPaymentMethod: backupPaymentMethod,
					total: responseJson.total ? responseJson.total : 0,
					message: null
				});
			})
			.catch((error) => {
				this.setState({loading: false});
				console.error(error);
			});
	}

	shipToPressed() {
		this.props.navigator.push({id: 'ShippingInfoListView', shippingInfo: this.shippingInfo, previous:this});
	}
	payWithPressed() {
		this.props.navigator.push({id: 'PaymentMethodsListView', paymentInfo: this.paymentInfo, previous:this});
	}
	payNowPressed(){
		this.setState({
			message: 'Success'
		})
	}
	render() {
		return (
			<ViewContainer message={this.state.message}>
				{this.state.selectedShippingInfo ?
					<TouchableHighlight onPress={()=>this.shipToPressed()} style={styles.touchable} underlayColor='#0070ba'>
						<View style={styles.touchableContainer}>
							<View style={styles.touchableInnerText}>
								<Text style={styles.touchableH1}>Ship to</Text>
								<Text style={styles.touchableH2}>{this.state.selectedShippingInfo.name}</Text>
								<Text style={styles.touchableH3}>{this.state.selectedShippingInfo.address}</Text>
							</View>
							<Text style={styles.touchableRightArrow}>></Text>
						</View>
					</TouchableHighlight> : null
				}
				{this.state.selectedPaymentMethod ?
					<TouchableHighlight onPress={()=>this.payWithPressed()} style={styles.touchable} underlayColor='#0070ba'>
						<View style={styles.touchableContainer}>
							<View style={styles.touchableInnerText}>
								<Text style={styles.touchableH1}>Pay with</Text>
								<Text style={styles.touchableH2}>{this.state.selectedPaymentMethod.name} {this.state.selectedPaymentMethod.number}</Text>
								{this.state.backupPaymentMethod ?
									<Text
										style={[styles.touchableH3, styles.greyText]}>{this.state.backupPaymentMethod.name} {this.state.backupPaymentMethod.number}
										(backup)</Text>
									: null }
							</View>
							<Text style={styles.touchableRightArrow}>></Text>
						</View>
					</TouchableHighlight> : null
				}
				<TouchableHighlight onPress={()=>Alert.alert('Nothing happened.')} style={[styles.touchable, styles.total]}
				                    underlayColor='#0070ba'>
					<View style={styles.touchableContainer}>
						<Text style={[styles.touchableH1, styles.totalLabel]}>Total</Text>
						<Text style={styles.touchableH1}>${this.state.total}</Text>
						<Text style={styles.touchableRightArrow}>&gt;</Text>
					</View>
				</TouchableHighlight>
				<Text style={styles.text}>View <Text style={styles.blueText}>PayPal Policies</Text> and your payment method rights.</Text>
				<TouchableHighlight onPress={()=>this.payNowPressed()} style={[styles.touchable, styles.payNow]}
				                    underlayColor='grey'>
					<Text style={styles.payNowText}>Pay Now</Text>
				</TouchableHighlight>
				<Text style={[styles.smallText,styles.greyText]}>If money is added to your Paypal balance before this transaction completes, the additional balance may be used to complete your payment. <Text style={styles.blueText}>Learn More</Text>.</Text>
			</ViewContainer>
		)
	}
}

const styles = StyleSheet.create({
	touchable: {
		padding: 20
	},
	touchableH1: {
		fontWeight: 'bold',
		fontSize: 20,
		paddingTop: 5,
		paddingBottom: 5
	},
	touchableH2: {
		fontSize: 20,
		paddingTop: 5,
		paddingBottom: 5
	},
	touchableH3: {
		fontSize: 19,
		paddingTop: 5,
		paddingBottom: 5
	},
	greyText: {
		color: 'grey'
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
	touchableRightArrow: {
		color: '#0070ba',
		fontSize: 20,
		padding: 10,
		fontWeight: 'bold'
	},
	totalLabel: {
		flex: 1
	},
	total: {
		backgroundColor: 'rgba(0,0,0,0.1)',
	},
	text: {
		fontSize: 15,
		padding: 20
	},
	smallText: {
		fontSize: 14,
		padding: 20
	},
	blueText: {
		color: '#0070ba',
	},
	payNow: {
		backgroundColor: '#0070ba',
		borderRadius: 8,
		margin: 20,
		alignItems: 'center'
	},
	payNowText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	}
});
module.exports = CheckOutView;