'use strict';

/* Controllers */

var budgetTrackerControllers = angular.module('budgetTracker.controllers', []);

//https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec

budgetTrackerControllers.value('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

budgetTrackerControllers.value('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

budgetTrackerControllers.controller('LoginCtrl', 
  ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService',
  function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.credentials = {
    email: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      $scope.setCurrentUser(user);
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
}]);

budgetTrackerControllers.controller('ApplicationCtrl', 
  ['$scope', 'USER_ROLES', 'AuthService',
  function ($scope, USER_ROLES, AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };
	
	$scope.logout = function(){
		$scope.currentUser = null;
		AuthService.logout();
	};
}]);

budgetTrackerControllers.controller('IndexCtrl', 
  ['$scope', 'Account', 'Transaction', 
  function($scope, Account, Transaction) {
      
  }]);

/*budgetTrackerControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);*/

budgetTrackerControllers.controller('AccountCtrl', 
  ['$scope', '$routeParams', 'Account', 'Transaction', 
  function($scope, $routeParams, Account) {
	// put our profile in the scope for use in DOM
	$scope.account = Account("physicsmarie");
	// create a 3-way binding to our Profile as $scope.profile
	Account("physicsmarie").$bindTo($scope, "account");
  }]);

budgetTrackerControllers.controller('TransactionCtrl', 
  ['$scope', '$routeParams', 'Transaction',
  function($scope, $routeParams, Transaction) {
    // put our profile in the scope for use in DOM
	$scope.transaction = Transaction("physicsmarie");
	// create a 3-way binding to our Profile as $scope.profile
	Transaction("physicsmarie").$bindTo($scope, "transaction");
  }]);