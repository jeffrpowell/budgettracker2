'use strict';

angular.module('budgetTracker.utils.monthSelection', ['budgetTracker.services'])
.directive('monthSelection', ['BudgetDate', function (BudgetDate) {
		var extractDateInt = function(dateObj){
			return parseInt(dateObj.getFullYear()+(("0"+(dateObj.getMonth()+1)).slice(-2)));
		};
		return {
			restrict: 'E',
			templateUrl: function (elem, attr) {
				return 'common/directives/monthSelection/monthSelection' + attr.mode + '.html';
			},
			scope: {
				onDateSelected: '&'
			},
			link: function (scope, element, attrs) {
				BudgetDate.getBudgetDate().then(function(value){
					var dateParts = BudgetDate.extractDateParts(value.$value);
					scope.budgetDate = new Date(dateParts.year, dateParts.month, 1, 0, 0, 0, 0);
					scope.onDateSelected({newDate: value.$value});
				});
				var updateDate = function () {
					var dateInt = extractDateInt(scope.budgetDate);
					BudgetDate.setBudgetDate(dateInt);
					scope.onDateSelected({newDate: dateInt});
				};
				scope.$watch('budgetDate', function (oldVal, newVal) {
					if (newVal !== undefined && newVal) {
						updateDate();
					}
				});
			}
		};
	}]);