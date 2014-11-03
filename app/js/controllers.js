'use strict';

/* Controllers */

var budgetTrackerControllers = angular.module('budgetTrackerControllers', []);

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
}]);

budgetTrackerControllers.controller('IndexCtrl', 
  ['$scope', 'Account', 'Transaction', 
  function($scope, Account, Transaction) {
    /*$scope.phones = Phone.query();
    $scope.orderProp = 'age';*/
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
  function($scope, $routeParams, Account, Transaction) {
    
  }]);

budgetTrackerControllers.controller('TransactionCtrl', 
  ['$scope', '$routeParams', 'Transaction',
  function($scope, $routeParams, Transaction) {
    
  }]);