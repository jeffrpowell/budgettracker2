'use strict';

/* Controllers */

angular.module('budgetTracker.controllers', ['firebase.utils', 'simpleLogin'])

.controller('LoginCtrl', ['$scope', 'simpleLogin', '$location', function($scope, simpleLogin, $location) {
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
  }])

.controller('HomeCtrl', 
['$scope',
	function($scope) {
    
  }])
  
.controller('CategoryDetailCtrl',['$scope', '$routeParams', 'Category', '$location', 
	function($scope, $routeParams, Category, $location){
		$scope.category = Category.$getRecord($routeParams.cid);
		if ($scope.category === null){
			$scope.category = {
				'name': '',
				'bank_accounts': false,
				'income_accounts': ($routeParams.income && $routeParams.income == "income")
			};
			$scope.title = "Add New ";
			$scope.add_mode = true;
		}
		else{
			$scope.title = "Edit " + $scope.category.name + " ";
			$scope.add_mode = false;
		}
		
		$scope.saveCategory = function(){
			if ($scope.category){
				//TODO: validation framework
				if ($scope.add_mode){
					Category.$add($scope.category);
				}
				else{
					Category.$save($scope.category);
				}
				$location.path('home');
			}
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