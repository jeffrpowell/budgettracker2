'use strict';

angular.module('budgetTracker.home', ['budgetTracker.services'])
.config(['$provide', function ($provide) {
		// adapt ng-cloak to wait for auth before it does its magic
		$provide.decorator('ngCloakDirective', ['$delegate', 'Auth',
			function ($delegate, Auth) {
				var directive = $delegate[0];
				// make a copy of the old directive
				var _compile = directive.compile;
				directive.compile = function (element, attr) {
					var authData = Auth.$getAuth();
					if (authData) {
						// after auth, run the original ng-cloak directive
						_compile.call(directive, element, attr);
					}
				};
				// return the modified directive
				return $delegate;
			}]);
	}])
.controller('NavCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
		$scope.authData = Auth.$getAuth();
		Auth.$onAuth(function (authData) {
			$scope.authData = !!authData;
		});
		$scope.logout = function () {
			$location.path('login');
			Auth.$unauth();
		};
	}])

.controller('HomeCtrl',
['$scope', function ($scope) {
		
	}]);