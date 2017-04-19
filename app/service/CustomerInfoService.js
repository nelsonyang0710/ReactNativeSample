'use strict'
import React from 'react';
module.exports = {
	getInfoFromAPI: function() {
		return fetch('http://localhost:8080/api/customerInfo').then((response) => response.json())
	}
}