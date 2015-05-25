'use strict';

angular.module('budgetTracker.paycheck', ['budgetTracker.services'])

.controller('PaycheckCtrl', ['$scope', 'Budget', 'Categories', function ($scope, Budget, Categories) {
		$scope.categories = Categories.get();
		$scope.changeDate = function(newDate){
			$scope.date = newDate;
			if ($scope.unbind){
				$scope.unbind();
			}
			Budget.getBudgetForMonth(newDate).$bindTo($scope, "budget").then(function(unbind){
				$scope.unbind = unbind;
			});
		};
		$scope.updateNextMonthsSuggestion = function(category, envelope){
			Budget.updateNextMonthsSuggestion($scope.date, category, envelope, $scope.budget.categories[category].envelopes[envelope].allocation);
		};
	}]);