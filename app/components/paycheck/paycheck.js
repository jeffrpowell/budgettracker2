'use strict';

angular.module('budgetTracker.paycheck', ['budgetTracker.services'])

.controller('PaycheckCtrl', ['$scope', 'Budget', 'Categories', function ($scope, Budget, Categories) {
		$scope.categories = Categories.get();
		$scope.changeDate = function(newDate){
			$scope.date = newDate;
			$scope.runningTotal = {};
			if ($scope.unbind){
				$scope.unbind();
			}
			Budget.getBudgetForMonth(newDate).$bindTo($scope, "budget").then(function(unbind){
				$scope.unbind = unbind;
				$scope.refreshTotals();
			});
		};
		$scope.refreshTotals = function(){
			var total = $scope.budget.income;
			angular.forEach($scope.budget.categories, function(category, categoryKey){
				angular.forEach(category.envelopes, function(envelope, envelopeKey){
					var envelopeAllocation = 0;
					if (envelope.allocation){
						envelopeAllocation = envelope.allocation;
					}
					else if (envelope.suggestion){
						envelopeAllocation = envelope.suggestion;
					}
					total -= envelopeAllocation;
					$scope.runningTotal[envelopeKey] = total;
				});
			});
		};
		$scope.updateNextMonthsSuggestion = function(category, envelope){
			Budget.updateNextMonthsSuggestion($scope.date, category, envelope, $scope.budget.categories[category].envelopes[envelope].allocation);
			$scope.refreshTotals();
		};
	}]);