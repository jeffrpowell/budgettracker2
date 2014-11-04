'use strict';

angular.module('budgetTrackerDirectives', []).directive('myAuth', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});