/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
	Navigator,
} from 'react-native';
import CheckOutView from './app/views/CheckOutView';
import ShippingInfoListView from './app/views/ShippingInfoListView';
import PaymentMethodsListView from './app/views/PaymentMethodsListView';
class ReactNaiveExample extends Component {
	_renderScene(route, navigator) {
		var globalNavigatorProps = {navigator}
		switch (route.id) {
			case 'CheckOutView':
				return (
          <CheckOutView {...globalNavigatorProps}/>
				)
			case 'ShippingInfoListView':
				return (
					<ShippingInfoListView {...globalNavigatorProps} shippingInfo={route.shippingInfo} previous={route.previous}/>
				)
			case 'PaymentMethodsListView':
				return (
					<PaymentMethodsListView {...globalNavigatorProps} paymentInfo={route.paymentInfo} previous={route.previous}/>
				)
			default:
				return (
          <text>{'Undefined route'}</text>
				)

		}
	}
	render() {
		return (
      <Navigator
        initialRoute={{id:'CheckOutView'}}
        ref='appNavigator'
        renderScene={this._renderScene}
      />

		);
	}
}

AppRegistry.registerComponent('ReactNaiveExample', () => ReactNaiveExample);
