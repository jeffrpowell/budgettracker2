'use strict';

// Declare app level module which depends on views, and components
angular.module('budgetTracker', [
	'mgcrea.ngStrap',
	'xeditable',
	'budgetTracker.config',
	'budgetTracker.filters',
	'budgetTracker.utils.monthSelection',
	'budgetTracker.login',
	'budgetTracker.login.directives',
	'budgetTracker.home',
	'budgetTracker.routes'
])

.run(['editableOptions', function(editableOptions) {
	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);
