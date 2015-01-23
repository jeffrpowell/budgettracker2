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
			return arr.$set(aid, aid);
		},
		"removeAcct": function(cid, aid){
			var accts = fbutil.angularFireRef('account_category/'+cid+'/accounts', {});
			return accts.$remove(aid);
		},
		"remove": function(cid){
			var cats = fbutil.angularFireRef('account_category/', {});
			return cats.$remove(cid);
		},
		"load": function(cid, callback){
			fbutil.syncObject('account_category/'+cid, {}).$loaded(callback);
		},
		"all": fbutil.syncArray('account_category', {}),
		"bank": fbutil.angularFireFromRef(fbutil.ref('account_category').orderByChild('type').startAt('bank').endAt('bank')).$asArray(),
		"income": fbutil.angularFireFromRef(fbutil.ref('account_category').orderByChild('type').startAt('income').endAt('income')).$asArray(),
		"expense": fbutil.angularFireFromRef(fbutil.ref('account_category').orderByChild('type').startAt('expense').endAt('expense')).$asArray()
	};
}])

.factory('Account', ['fbutil', function(fbutil){
	return {
		"all": fbutil.syncArray('account', {}),
		"query": function(aid){
			return fbutil.syncObject('account/'+aid, {});
		},
		"load": function(aid, callback){
			fbutil.syncObject('account/'+aid, {}).$loaded(callback);
		},
		"remove": function(aid){
			var accts = fbutil.angularFireRef('account/', {});
			return accts.$remove(aid);
		},
		"bank": fbutil.angularFireFromRef(fbutil.ref('account').orderByChild('category_type').startAt('bank').endAt('bank')).$asArray(),
		"income": fbutil.angularFireFromRef(fbutil.ref('account').orderByChild('category_type').startAt('income').endAt('income')).$asArray(),
		"expense": fbutil.angularFireFromRef(fbutil.ref('account').orderByChild('category_type').startAt('expense').endAt('expense')).$asArray()
	};
}])

.factory('Transaction', ['fbutil', function(fbutil){
	return {
		"getAllByDate": function(month, year){
			fbutil.syncArray('transaction/'+month+'-'+year, {});
		},
		"load": function(tid, callback){
			fbutil.syncObject('transaction/'+tid, {}).$loaded(callback);
		},
		"remove": function(tid){
			var trans = fbutil.angularFireRef('transaction/', {});
			return trans.$remove(tid);
		}
	};
}]);
/*
 * .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }]);
 */