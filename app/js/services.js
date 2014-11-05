'use strict';

/* Services */

var budgetTrackerServices = angular.module('budgetTrackerServices', ['ngResource', 'firebase']);

budgetTrackerServices.value('FirebaseRefUrl', 'https://budgettracker2.firebaseio.com/');

budgetTrackerServices.factory('Account', ['$firebase', 'FirebaseRefUrl', 
	function ($firebase, FirebaseRefUrl) {
		return function(accountId){
			var ref = new Firebase(FirebaseRefUrl + "account/" + accountId);
			return $firebase(ref).$asObject();
		};
	}]);

budgetTrackerServices.factory('Transaction', ['$firebase', 'FirebaseRefUrl', 
	function ($firebase, FirebaseRefUrl) {
		return function(transactionId){
			var ref = new Firebase(FirebaseRefUrl + "transaction/" + transactionId);
			return $firebase(ref).$asObject();
		};
	}]);

budgetTrackerServices.factory('firebaseService', ['$firebase', '$firebaseSimpleLogin', 'FirebaseRefUrl',
	function($firebase, $firebaseSimpleLogin, FirebaseRefUrl){
		var firebaseService = {};
		firebaseService.ref = new Firebase(FirebaseRefUrl);
		firebaseService.sync = $firebase(firebaseService.ref);
		firebaseService.authClient = $firebaseSimpleLogin(firebaseService.ref);
		return firebaseService;
	}]);

budgetTrackerServices.factory('simpleLogin', ['$firebaseSimpleLogin', 'FirebaseRefUrl', 
	function($firebaseSimpleLogin, FirebaseRefUrl){
		return $firebaseSimpleLogin(new Firebase(FirebaseRefUrl));
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