'use strict';

/* Services */

var budgetTrackerServices = angular.module('budgetTracker.services', []);

/*
 * .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }]);
 */

budgetTrackerServices.factory('Account', ['fbutil', 
	function (fbutil) {
		return function(accountId){
			var ref = new Firebase(FirebaseRefUrl + "account/" + accountId);
			return $firebase(ref).$asObject();
		};
	}]);

budgetTrackerServices.factory('Transaction', ['fbutil', 
	function (fbutil) {
		return function(transactionId){
			var ref = new Firebase(FirebaseRefUrl + "transaction/" + transactionId);
			return $firebase(ref).$asObject();
		};
	}]);

budgetTrackerServices.factory('AuthService', ['simpleLogin',
	function (simpleLogin) {

		var authService = {};

		authService.login = function (credentials) {
			simpleLogin.$login("password",
					{
						email: credentials.email,
						password: credentials.password
					}).then(function (user) {
				console.log("Logged in as: " + user.uid);
			}), function (error) {
				console.log("Login failed: " + error);
			};
//			$firebase.authWithPassword({
//				email: credentials.email,
//				password: credentials.password
//			},
//			function (error, authData) {
//				if (error === null) {
//					// user authenticated with Firebase
//					console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
//					return authData;
//				} else {
//					console.log("Error authenticating user:", error);
//					return {};
//				}
//			});

		};

		authService.logout = function () {
			simpleLogin.$logout();
		};

		authService.isAuthenticated = function () {
			return $firebase.getAuth();
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