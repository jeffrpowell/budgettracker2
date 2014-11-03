'use strict';

/* Services */

var budgetTrackerServices = angular.module('budgetTrackerServices', ['ngResource']);

budgetTrackerServices.factory('Account', ['$resource',
  function($resource){
    /*return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });*/
  }]);

budgetTrackerServices.factory('Transaction', ['$resource',
  function($resource){
    
  }]);

//https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec#13fd

budgetTrackerServices.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  return this;
});

budgetTrackerServices.factory('AuthService', ['$http', 'Session',
function ($http, Session) {
  var authService = {};
 
  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;
}]);