'use strict'
import React from 'react';
module.exports = {
	getInfoFromAPI: function() {
		return fetch('http://192.168.0.4:8080/api/customerInfo').then((response) => response.json())
	}
}