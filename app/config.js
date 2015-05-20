'use strict';

// Declare app level module which depends on filters, and services
angular.module('budgetTracker.config', [])

// where to redirect users if they need to authenticate (see routeSecurity.js)
.constant('loginRedirectPath', '/login')

// your Firebase data URL goes here, no trailing slash
.constant('FBURL', 'https://budgettracker2.firebaseio.com')

