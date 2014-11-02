'use strict';

// Declare app level module which depends on views, and components
var budgetTrackerApp = angular.module('budgetTrackerApp', [
  'ngRoute',
  'budgetTrackerControllers',
  //'budgetTrackerFilters',
  'budgetTrackerServices'
]);

budgetTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'IndexCtrl'
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
