angular.module('budgetTracker.stateConfig', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /home
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
	})
	.state('envelopes', {
		url: "/envelopes",
		templateUrl: "components/envelopes/envelopes.html",
		controller: 'EnvelopeCtrl',
		authenticate: true
	});
});