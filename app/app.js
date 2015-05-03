'use strict';

// Declare app level module which depends on views, and components
angular.module('budgetTracker', [
	'budgetTracker.config',
	'mgcrea.ngStrap',
	'xeditable',
	'budgetTracker.login',
	'budgetTracker.login.directives',
	'budgetTracker.home',
	'budgetTracker.routes',
	'budgetTracker.utils.monthSelection',
	'budgetTracker.filters'
])

.run(['editableOptions', function(editableOptions) {
	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);
