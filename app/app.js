'use strict';

// Declare app level module which depends on views, and components
angular.module('budgetTracker', [
	'mgcrea.ngStrap',
	'xeditable',
	'ui.router',
	'budgetTracker.config',
	'budgetTracker.filters',
	'budgetTracker.utils.monthSelection',
	'budgetTracker.login',
	'budgetTracker.login.directives',
	'budgetTracker.home'
])

.config(function ($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/home");

	// Now set up the states
	$stateProvider
	.state('home', {
		url: "/home",
		templateUrl: "components/home/home.html",
		controller: "HomeCtrl",
		authenticate: true
	})
	.state('login', {
		url: "/login",
		templateUrl: "components/login/login.html",
		controller: 'LoginCtrl',
		authenticate: false
	})
	.state('paycheck', {
		url: "/paycheck",
		templateUrl: "components/paycheck/paycheck.html",
		controller: 'PaycheckCtrl',
		authenticate: true
	});
})

.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
		$rootScope.$on("$stateChangeStart",
		function (event, toState, toParams, fromState, fromParams) {
			if (toState.authenticate && Auth.$getAuth() === null) {
				event.preventDefault();
				$state.go("login");
			}
		});

	}])

.run(['editableOptions', function (editableOptions) {
		editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	}]);
