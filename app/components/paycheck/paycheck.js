'use strict';

angular.module('budgetTracker.paycheck', ['budgetTracker.services'])

.controller('PaycheckCtrl', ['$scope', 'Budget', 'Categories', function ($scope, Budget, Categories) {
		$scope.categories = Categories.get();
		$scope.changeDate = function(newDate){
			if ($scope.unbind){
				$scope.unbind();
			}
			Budget.getBudgetForMonth(newDate).$bindTo($scope, "budget").then(function(unbind){
				$scope.unbind = unbind;
			});
		};
	}]);