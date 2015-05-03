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
		$scope.goHome = function () {
			$location.path('home');
		};
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
['$scope', 'Category', 'ModelInstances',
	function ($scope, Category, ModelInstances) {
		$scope.categories = {};
		Category.bank().$loaded(function (banks) {
			$scope.categories.bank = banks;
			for (var cat in banks) {
				if (banks.hasOwnProperty(cat) && banks[cat].accounts) {
					//We're counting on there being only 1 bank category
					$scope.bankcatid = $scope.categories.bank[cat].$id;
					for (var acct in banks[cat].accounts) {
						if (banks[cat].accounts.hasOwnProperty(acct)) {
							ModelInstances.getAccount(acct).$loaded(function (loadedAcct) {
								if (!loadedAcct.hasOwnProperty("parent_account")) {
									//The '0' index here is a hack because we're only
									//expecting 1 bank category in the app. The reason
									//why I don't use 'cat' to index is because the parent
									//function async. looped through each property from
									//line 44 before hitting this line
									$scope.categories.bank[0].accounts[loadedAcct.$id] = loadedAcct;
								}
								else {
									delete $scope.categories.bank[0].accounts[loadedAcct.$id];
								}
							});
							//$scope.categories.bank[cat].accounts[acct] = Account.query(acct);
						}
					}
				}
			}
		});
		Category.income().$loaded(function (incomes) {
			$scope.categories.income = incomes;
			for (var cat in incomes) {
				if (incomes.hasOwnProperty(cat) && incomes[cat].accounts) {
					for (var acct in incomes[cat].accounts) {
						if (incomes[cat].accounts.hasOwnProperty(acct)) {
							/*Account.load(acct, function(loadedAcct){
							 $scope.categories.income.cat.accounts.acct = loadedAcct;
							 });*/
							$scope.categories.income[cat].accounts[acct] = ModelInstances.getAccount(acct);
						}
					}
				}
			}
		});
		Category.expense().$loaded(function (expenses) {
			$scope.categories.expense = expenses;
			for (var cat in expenses) {
				if (expenses.hasOwnProperty(cat) && expenses[cat].accounts) {
					for (var acct in expenses[cat].accounts) {
						if (expenses[cat].accounts.hasOwnProperty(acct)) {
							/*Account.load(acct, function(loadedAcct){
							 $scope.categories.income.cat.accounts.acct = loadedAcct;
							 });*/
							$scope.categories.expense[cat].accounts[acct] = ModelInstances.getAccount(acct);
						}
					}
				}
			}
		});
		$scope.updateBackingTransactions = function (newDate) {
			console.log("TODO: update backing transactions for " + newDate);
		};
	}]);