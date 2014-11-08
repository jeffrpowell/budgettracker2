'use strict';

/* Services */

angular.module('budgetTracker.services', [])

.factory('Category', ['fbutil', function(fbutil){
	return fbutil.syncArray('account_category', {});
}]);

/*
 * .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }]);
 */