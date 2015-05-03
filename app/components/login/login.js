'use strict';

angular.module('budgetTracker.login', ['budgetTracker.services'])

.controller('LoginCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
    $scope.email = null;
    $scope.pass = null;

    $scope.login = function() {
		var $submitBtn = jQuery('#loginSubmit')
		$submitBtn.button('loading');
		$scope.err = null;
		if (assertValidAccountProps()){
			Auth.$authWithPassword({
				email: $scope.email,
				password: $scope.pass
			}).then(function(authData) {
				$submitBtn.button('reset');
				$location.path('home');
			}).catch(function(error) {
				$submitBtn.button('reset');
				$scope.err = "Authentication failed: " + error;
			});
		}
		else{
			$submitBtn.button('reset');
		}
    };

    function assertValidAccountProps() {
      if( !$scope.email ) {
        $scope.err = 'Please enter an email address';
      }
      else if( !$scope.pass) {
        $scope.err = 'Please enter a password';
      }
      return !$scope.err;
    }

    function errMessage(err) {
      return angular.isObject(err) && err.code? err.code : err + '';
    }
  }])