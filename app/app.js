'use strict';

// Declare app level module which depends on views, and components
angular.module('budgetTracker', [
	'ui.bootstrap',
	'xeditable',
	'ui.router',
	'budgetTracker.config',
	'budgetTracker.stateConfig',
	'budgetTracker.filters',
	'budgetTracker.utils.monthSelection',
	'budgetTracker.login',
	'budgetTracker.login.directives',
	'budgetTracker.home',
	'budgetTracker.paycheck',
	'budgetTracker.accounts'
])

.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
		$rootScope.$on("$stateChangeStart",
		function (event, toState, toParams, fromState, fromParams) {
			if (toState.authenticate && Auth.$getAuth() === null) {
				event.preventDefault();
				$state.go("login");
			}
		});
	}]);