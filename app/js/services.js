'use strict';

/* Services */

var budgetTrackerServices = angular.module('budgetTrackerServices', ['ngResource']);
var firebaseRef = new Firebase("https://budgettracker2.firebaseio.com/");

budgetTrackerServices.factory('Account', ['$resource',
  function($resource){
    /*return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });*/
  }]);

budgetTrackerServices.factory('Transaction', ['$resource',
  function($resource){
    
  }]);

budgetTrackerServices.factory('AuthService', [function () {
  var authService = {};
 
  authService.login = function (credentials) {
    firebaseRef.authWithPassword({
        email : credentials.email,
        password : credentials.password
    }, 
    function(error, authData) {
        if (error === null) {
            // user authenticated with Firebase
            console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
            return authData;
        } else {
            console.log("Error authenticating user:", error);
            return {};
        }
    });
  };
  
  authService.logout = function(){
    firebaseRef.unauth();
  };
  
  authService.isAuthenticated = function(){
    return firebaseRef.getAuth();  
  };
 
 /*
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };*/
 
  return authService;
}]);