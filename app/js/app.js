'use strict';

// Declare app level module which depends on views, and components
var budgetTrackerApp = angular.module('budgetTrackerApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'budgetTrackerControllers',
  //'budgetTrackerFilters',
  'budgetTrackerServices'
]).
budgetTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      /*when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });*/
      otherwise({
          redirectTo: '/view1'
      });
  }]);
