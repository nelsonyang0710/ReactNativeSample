/**
 * @author nelson@talentcircles.com
 * @copyright CopyRight (c) 2016, TalentCircles, Inc.
 */

'use strict'
import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Text, Platform} from 'react-native'
import StatusBarBackground from '../components/StatusBarBackground';

class ViewContainer extends Component {
	render() {
		return (
			<View style={styles.viewContainer}>
				{Platform.OS === 'ios' ?<StatusBarBackground /> : null}
				<View style={styles.contentContainer}>
				{this.props.message ? <Text style={styles.message}>{this.props.message}</Text> :
					<ScrollView style={styles.scrollView}>
						{this.props.children}
					</ScrollView>
				}
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		flexDirection: 'column',
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	scrollView: {
		flex: 1
	},
	message: {
		alignSelf: 'center',
		fontSize:20,
		fontWeight: 'bold'
	},
})
module.exports = ViewContainer
