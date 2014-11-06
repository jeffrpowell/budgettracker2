'use strict';

// Declare app level module which depends on views, and components
angular.module('budgetTracker', [
	'budgetTracker.controllers',
	'budgetTracker.filters',
	'budgetTracker.services',
	'budgetTracker.directives',
	'budgetTracker.config',
	'myApp.afcontrollers',
	'budgetTracker.decorators',
	'budgetTracker.routes'
])

.run(['simpleLogin', function(simpleLogin) {
	console.log('run'); //debug
	simpleLogin.getUser();
}]);
