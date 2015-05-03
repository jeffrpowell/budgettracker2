'use strict';

/* Filters */

angular.module('budgetTracker.filters', []).filter('checkmark', function () {
	return function (input) {
		return input ? '\u2713' : '\u2718';
	};
})

.filter('interpolate', ['version', function (version) {
	return function (text) {
		return String(text).replace(/\%VERSION\%/mg, version);
	};
}])

.filter('reverse', function () {
	return function (items) {
		return items.slice().reverse();
	};
});
