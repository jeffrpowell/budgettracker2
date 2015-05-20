'use strict';

angular.module('budgetTracker.utils.monthSelection', ['budgetTracker.services'])
.directive('monthSelection', ['BudgetDate', function (BudgetDate) {
		//Expects integer with date format 'yyyyMM'
		var extractDateParts = function(budgetDate){
			var parts = {};
			parts.month = budgetDate % 100-1;
			parts.year = Math.floor(budgetDate / 100);
			return parts;
		};
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
					var dateParts = extractDateParts(value.$value);
					scope.budgetDate = new Date(dateParts.year, dateParts.month, 1, 0, 0, 0, 0);
				});
				var updateDate = function () {
					var dateInt = extractDateInt(scope.budgetDate);
					console.log("persisting "+dateInt);
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