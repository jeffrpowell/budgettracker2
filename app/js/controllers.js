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
['$scope', 'IncomeCategory',
	function($scope, IncomeCategory) {
		$scope.two = 2;
	}])
  
.controller('CategoryDetailCtrl',['$scope', '$routeParams', 'IncomeCategory', 'ExpenseCategory', '$location', 
	function($scope, $routeParams, IncomeCategory, ExpenseCategory, $location){
		var setupCategory = function(list){
			$scope.category = list.$getRecord($routeParams.cid);

			if ($scope.category === null){
				$scope.category = {
					'name': ''
				};
				$scope.title = "Add New ";
				$scope.add_mode = true;
			}
			else{
				$scope.title = "Edit " + $scope.category.name + " ";
				$scope.add_mode = false;
			}
		};
		
		if ($routeParams.cid === null && ($routeParams.type === "income" || $routeParams.type === "expense")){
			$scope.category = {
				'name': ''
			};
			$scope.title = "Add New ";
			$scope.add_mode = true;
		}
		else if ($routeParams.type === "income"){
			IncomeCategory.$loaded().then(setupCategory);
		}
		else if ($routeParams.type === "expense"){
			ExpenseCategory.$loaded().then(setupCategory);
		}
		else{
			$location.path('home');
		}
		
		$scope.saveCategory = function(){
			if ($scope.category){
				//TODO: validation framework
				if ($scope.add_mode){
					if ($routeParams.type === "income"){
						IncomeCategory.$add($scope.category);
					}
					else{
						ExpenseCategory.$add($scope.category);
					}
				}
				else{
					if ($routeParams.type === "income"){
						IncomeCategory.$save($scope.category);
					}
					else{
						ExpenseCategory.$save($scope.category);
					}
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