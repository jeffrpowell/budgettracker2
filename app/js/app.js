'use strict';

// Declare app level module which depends on views, and components
angular.module('budgetTracker', [
	'budgetTracker.config',
	'budgetTracker.controllers',
	'budgetTracker.decorators',
	'budgetTracker.directives',
	'budgetTracker.filters',
	'budgetTracker.routes',
	'budgetTracker.services'
])

.run(['simpleLogin', function(simpleLogin) {
	simpleLogin.getUser();
}]);
