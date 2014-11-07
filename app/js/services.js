'use strict';

/* Services */

angular.module('budgetTracker.services', [])

.factory('Category', ['fbutil', function(fbutil){
	var list = {};
	list.list = fbutil.syncArray('account_category', {});
	list.get = function(category_id){
		return list.list.child(category_id);
	};
	return list;
}]);

/*
 * .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }]);
 */