'use strict';

angular.module('budgetTracker.utils.monthSelection', ['budgetTracker.services'])
.directive('monthSelection', ['FilterDate', function (FilterDate) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: function (elem, attr) {
				return 'components/utils/monthSelection/monthSelection' + attr.mode + '.html'
			},
			scope: {
				onDateSelected: '&'
			},
			link: function (scope, element, attrs) {
				scope.filterDate = FilterDate.date;
				var updateDate = function () {
					FilterDate.date = scope.filterDate;
					scope.onDateSelected({newDate: scope.filterDate});
				};
				scope.$watch('filterDate', function (oldVal, newVal) {
					if (newVal !== undefined && newVal) {
						updateDate();
					}
				});
			}
		};
	}]);