'use strict';

angular.module('budgetTracker.paycheck', ['budgetTracker.services'])

.controller('PaycheckCtrl', ['$scope', 'Budget', function ($scope, Budget) {
		$scope.budget = Budget.getBudgetForMonth('201505');
	}]);