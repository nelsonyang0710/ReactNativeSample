/**
 * @author nelson@talentcircles.com
 * @copyright CopyRight (c) 2016, TalentCircles, Inc.
 */

'use strict'
import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
class StatusBarBackground extends Component {
	render() {
		return (
			<View style={styles.StatusBarBackground}>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	StatusBarBackground: {
		height: 20,
		backgroundColor: 'rgba(255,255,255,0.4)'
	}
})

module.exports = StatusBarBackground
