'use strict';

/* Controllers */

var budgetTrackerControllers = angular.module('budgetTracker.controllers', ['firebase.utils', 'simpleLogin']);

budgetTrackerControllers.controller('LoginCtrl', ['$scope', 'simpleLogin', '$location', function($scope, simpleLogin, $location) {
    $scope.email = null;
    $scope.pass = null;

    $scope.login = function(email, pass) {
      $scope.err = null;
	  if (assertValidAccountProps()){
		simpleLogin.login(email, pass)
		  .then(function(/* user */) {
			$location.path('/home');
		  }, function(err) {
			$scope.err = errMessage(err);
		  });
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
  }]);

budgetTrackerControllers.controller('HomeCtrl', 
['$scope', 'simpleLogin', 'fbutil', 'user', 'FBURL', '$location',
	function($scope, simpleLogin, fbutil, user, FBURL, $location) {
    $scope.syncedValue = fbutil.syncObject('syncedValue');
    $scope.user = user;
    $scope.FBURL = FBURL;
	// create a 3-way binding with the user profile object in Firebase
	var profile = fbutil.syncObject(['users', user.uid]);
	profile.$bindTo($scope, 'profile');

	// expose logout function to scope
	$scope.logout = function() {
		profile.$destroy();
		simpleLogin.logout();
		$location.path('/login');
	};
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