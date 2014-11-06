'use strict';

// Declare app level module which depends on views, and components
var budgetTrackerApp = angular.module('budgetTrackerApp', [
	'ngRoute',
	'budgetTrackerControllers',
	//'budgetTrackerFilters',
	'budgetTrackerServices',
	'budgetTrackerDirectives',
	'myApp.config',
//	'myApp.controllers',
	'myApp.decorators',
	'myApp.directives',
//	'myApp.filters',
	'myApp.routes',
//	'myApp.services'
])

.run(['simpleLogin', function(simpleLogin) {
	console.log('run'); //debug
	simpleLogin.getUser();
}]);

budgetTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'IndexCtrl',
		resolve: {
			// controller will not be loaded until $getCurrentUser resolves
			// simpleLogin refers to our $firebaseSimpleLogin wrapper in the example above
			"currentUser": ["simpleLogin", function(simpleLogin) {
			// $getCurrentUser returns a promise so the resolve waits for it to complete
			return simpleLogin.$getCurrentUser();
			}]
		}
      })
      .when('/auth', {
          templateUrl: 'partials/auth.html',
          controller: 'LoginCtrl'
      })
      /*when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });*/
      .otherwise({
          redirectTo: '/'
      });
  }]);
