'use strict';

// Declare app level module which depends on views, and components
angular.module('budgetTracker', [
	'budgetTracker.config',
	'mgcrea.ngStrap',
	'xeditable',
	'budgetTracker.controllers',
	'budgetTracker.decorators',
	'budgetTracker.directives',
	'budgetTracker.filters',
	'budgetTracker.routes',
	'budgetTracker.services'
])

.run(['simpleLogin', function(simpleLogin) {
	simpleLogin.getUser();
}])

.run(['editableOptions', function(editableOptions) {
	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);
