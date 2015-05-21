'use strict';

angular.module('budgetTracker.paycheck', ['budgetTracker.services'])

.controller('PaycheckCtrl', ['$scope', 'Budget', 'Categories', function ($scope, Budget, Categories) {
		$scope.categories = Categories;
		$scope.changeDate = function(newDate){
			$scope.budget = Budget.getBudgetForMonth(newDate);
			$scope.budget.$loaded(function(data){
				var debug = true;
			});
		};
	}]);