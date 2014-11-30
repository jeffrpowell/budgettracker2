'use strict';

/* Services */

angular.module('budgetTracker.services', [])

.factory('Category', ['fbutil', function(fbutil){
	return {
		"customArr": function(path){
			return fbutil.syncArray('account_category/'+path, {});
		},
		"customObj": function(path){
			return fbutil.syncObject('account_category/'+path, {});
		},
		"addAcct": function(cid, aid){
			var arr = fbutil.angularFireRef('account_category/'+cid+'/accounts', {});
			arr.$set(aid, aid);
		},
		"removeAcct": function(cid, aid){
			var accts = fbutil.angularFireRef('account_category/'+cid+'/accounts', {});
			accts.$remove(aid);
		},
		"all": fbutil.syncArray('account_category', {}),
		"bank": fbutil.angularFireFromRef(fbutil.ref('account_category').orderByChild('type').startAt('bank').endAt('bank')).$asArray(),
		"income": fbutil.angularFireFromRef(fbutil.ref('account_category').orderByChild('type').startAt('income').endAt('income')).$asArray(),
		"expense": fbutil.angularFireFromRef(fbutil.ref('account_category').orderByChild('type').startAt('expense').endAt('expense')).$asArray()
	};
}])

.factory('BankCategory', ['fbutil', function(fbutil){
	return fbutil.syncArray('account_category/bank', {});
}])

.factory('IncomeCategory', ['fbutil', function(fbutil){
	return fbutil.syncArray('account_category/income', {});
}])

.factory('ExpenseCategory', ['fbutil', function(fbutil){
	return fbutil.syncArray('account_category/expense', {});
}])

.factory('Account', ['fbutil', function(fbutil){
	return {
		"all": fbutil.syncArray('account', {}),
		"query": function(aid){
			return fbutil.syncObject('account/'+aid, {});
		}
	};
}]);
/*
 * .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }]);
 */