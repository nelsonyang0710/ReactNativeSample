"use strict";
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, ListView} from 'react-native';
import ViewContainer from '../components/ViewContainer';
class ShippingInfoListView extends Component {
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
				<ListView dataSource={this.ds.cloneWithRows(this.props.shippingInfo)}
				          renderRow={(shippingInfo, sectionID, rowID, highlightRow) => this._renderShippingInfoRow(shippingInfo, sectionID, rowID, highlightRow)}
				          enableEmptySections={true} removeClippedSubviews={false}/>
			</ViewContainer>
		)
	}

	_renderShippingInfoRow(shippingInfo, sectionID, rowID, highlightRow) {
		return (
			<TouchableHighlight onPress={() => this.onShippingInfoPressed(shippingInfo)} style={styles.touchable} underlayColor='#0070ba'>
				<View style={styles.touchableContainer}>
					<Text style={styles.touchableLeftArrow}>&lt;</Text>
					<View style={styles.touchableInnerText}>
						<Text style={styles.touchableH2}>{shippingInfo.name}</Text>
						<Text style={styles.touchableH3}>{shippingInfo.address}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	onShippingInfoPressed(shippingInfo) {
		this.props.previous.setState({selectedShippingInfo:shippingInfo});
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
	touchableH3: {
		fontSize: 19,
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
module.exports = ShippingInfoListView;