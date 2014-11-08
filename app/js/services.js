'use strict';

/* Services */

angular.module('budgetTracker.services', [])

.factory('BankCategory', ['fbutil', function(fbutil){
	return fbutil.syncArray('account_category/bank', {});
}])

.factory('IncomeCategory', ['fbutil', function(fbutil){
	return fbutil.syncArray('account_category/income', {});
}])

.factory('ExpenseCategory', ['fbutil', function(fbutil){
	return fbutil.syncArray('account_category/expense', {});
}]);
/*
 * .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }]);
 */