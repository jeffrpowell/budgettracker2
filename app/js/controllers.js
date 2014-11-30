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
['$scope', 'Category', 'Account', 
	function($scope, Category, Account) {
		$scope.categories = {};
		Category.bank.$loaded(function(banks){
			$scope.categories.bank = banks;
			for (var cat in banks) {
				if (banks.hasOwnProperty(cat) && banks[cat].accounts){
					//We're counting on there being only 1 bank category
					$scope.bankcatid = $scope.categories.bank[cat].$id;
					for (var acct in banks[cat].accounts){
						if (banks[cat].accounts.hasOwnProperty(acct)){
							Account.query(acct).$loaded().then(function(loadedAcct){
								if (!loadedAcct.hasOwnProperty("parent_account")){
									//The '0' index here is a hack because we're only
									//expecting 1 bank category in the app. The reason
									//why I don't use 'cat' to index is because the parent
									//function async. looped through each property from
									//line 44 before hitting this line
									$scope.categories.bank[0].accounts[loadedAcct.$id] = loadedAcct;
								}
							});
							//$scope.categories.bank[cat].accounts[acct] = Account.query(acct);
						}
					}
				}
			}
		});
		Category.income.$loaded(function(incomes){
			$scope.categories.income = incomes;
			for (var cat in incomes) {
				if (incomes.hasOwnProperty(cat) && incomes[cat].accounts){
					for (var acct in incomes[cat].accounts){
						if (incomes[cat].accounts.hasOwnProperty(acct)){
							/*Account.query(acct).$loaded().then(function(loadedAcct){
								$scope.categories.income.cat.accounts.acct = loadedAcct;
							});*/
							$scope.categories.income[cat].accounts[acct] = Account.query(acct);
						}
					}
				}
			}
		});
		Category.expense.$loaded(function(expenses){
			$scope.categories.expense = expenses;
			for (var cat in expenses) {
				if (expenses.hasOwnProperty(cat) && expenses[cat].accounts){
					for (var acct in expenses[cat].accounts){
						if (expenses[cat].accounts.hasOwnProperty(acct)){
							/*Account.query(acct).$loaded().then(function(loadedAcct){
								$scope.categories.income.cat.accounts.acct = loadedAcct;
							});*/
							$scope.categories.expense[cat].accounts[acct] = Account.query(acct);
						}
					}
				}
			}
		});
	}])
  
.controller('CategoryDetailCtrl',['$scope', '$routeParams', 'Category', '$location', 
	function($scope, $routeParams, Category, $location){
		var setupCategory = function(cat){
			$scope.category = cat;//list.$getRecord($routeParams.cid);

			if ($scope.category.$id === "undefined"){
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
			$scope.category.type = $routeParams.type;
		};
		
		if ($routeParams.cid === null && ($routeParams.type === "income" || $routeParams.type === "expense" || $routeParams.type === "bank")){
			$scope.category = {
				'name': ''
			};
			$scope.title = "Add New ";
			$scope.add_mode = true;
		}
		else if ($routeParams.type === "income" || $routeParams.type === "expense" || $routeParams.type === "bank"){
			Category.customObj($routeParams.cid).$loaded().then(setupCategory);
		}
		else{
			$location.path('home');
		}
		
		$scope.saveCategory = function(){
			if ($scope.category){
				//TODO: validation framework
				if ($scope.add_mode){
					Category.all.$add($scope.category);
				}
				else{
					$scope.category.$save();
				}
				$location.path('home');
			}
		};
	}])

.controller('AddAccountCtrl',['$scope', '$routeParams', 'Account', 'Category', '$location', 
	function($scope, $routeParams, Account, Category, $location){
		//$routeParams.aid != null -> adding sub-account
		if (!$routeParams.cid){
			$location.path('home');
		}
		else{
			Category.customObj($routeParams.cid).$loaded(function(cat){
				$scope.category = {
					"$id": $routeParams.cid,
					"name": cat.name
				};
			});
			
			$scope.account = {
				"name": '',
				"balance": 0.00,
				"category": $routeParams.cid,
				"goal_account": false
			};
			
			if ($routeParams.type === "bank"){
				$scope.bank = true;
			}
			else{
				$scope.bank = false;
			}
			$scope.saveAccount = function(){
			if ($scope.account){
				//TODO: validation framework
				Account.all.$add($scope.account).then(function(ref){
					var accts = Category.customObj($routeParams.cid+"/accounts").$inst();
					accts.$set(ref.name(), ref.name());
					$location.path('home');
				});
			}
		};
		}
	}])

.controller('EditAccountCtrl',['$scope', '$routeParams', 'Account', 'Category', '$location', 
	function($scope, $routeParams, Account, Category, $location){
		
	}])

.controller('AccountCtrl',['$scope', '$routeParams', 'Account', 'Category', '$location', 
	function($scope, $routeParams, Account, Category, $location){
		
	}]);