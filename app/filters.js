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

.filter('reverse', [function () {
	return function (items) {
		return items.slice().reverse();
	};
}])

.filter('removeUndef', [function(){
	return function(inputArr){
		var output = [];
		angular.forEach(inputArr, function(value, key){
			if (key !== undefined && value !== undefined){
				this.push(value);
			}
		}, output);
		return output;
	};
}]);
