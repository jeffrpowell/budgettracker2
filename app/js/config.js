'use strict';

// Declare app level module which depends on filters, and services
angular.module('budgetTracker.config', ['mgcrea.ngStrap'])

// configuring our datepicker here so that we don't have to clutter html 
// instances with a lot of data-* attributes
.config(function ($datepickerProvider) {
	angular.extend($datepickerProvider.defaults, {
		//Since there are more month-selection datepicker instances, defaults go to support them
		startWeek: 0,
		autoclose: true,
		startDate: "today",
		dateType: "date",
		dateFormat: "MMMM y",
		minView: "1"
		//For reference, here are the defaults expected for a regular date selection
		//You'll need to manually specify these locally
		/*
		 dateFormat: "mediumDate", //"MMM d, y"
		 dateType: "number", //unix timestamp
		 minView: "0",
		 */
	});
})

// where to redirect users if they need to authenticate (see routeSecurity.js)
.constant('loginRedirectPath', '/login')

// your Firebase data URL goes here, no trailing slash
.constant('FBURL', 'https://budgettracker2.firebaseio.com')

.constant('CATEGORY_URL', 'account_category')

.constant('ACCOUNT_URL', 'account')

.constant('TRANSACTION_URL', 'transaction');

