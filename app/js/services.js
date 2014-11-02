'use strict';

/* Services */

var budgetTrackerServices = angular.module('budgetTrackerServices', ['ngResource']);

budgetTrackerServices.factory('Account', ['$resource',
  function($resource){
    /*return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });*/
  }]);

budgetTrackerServices.factory('Transaction', ['$resource',
  function($resource){
    
  }]);