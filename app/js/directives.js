'use strict';

angular.module('budgetTrackerDirectives', []).directive('myAuth', 
	['$rootScope', '$location', 'AuthService', 
		function($rootScope, $location, AuthService) {
			if (!AuthService.isAuthenticated()){
				$location.path("/auth");
			}
		}
	]);