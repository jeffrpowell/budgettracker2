'use strict';

/* Services */

angular.module('budgetTracker.services', [])

.factory('Auth', ['fbutil', '$firebaseAuth', function(fbutil, $firebaseAuth){
	return $firebaseAuth(fbutil.ref());	
}])

.factory('Category', ['fbutil', function(fbutil){
	return {
		"customArr": function(path){
			return fbutil.firebaseArray('account_category/'+path);
		},
		"customObj": function(path){
			return fbutil.firebaseObject('account_category/'+path);
		},
		"addAcct": function(cid, aid){
			var arr = fbutil.firebaseArray('account_category/'+cid+'/accounts');
			return arr.$set(aid, aid);
		},
		"removeAcct": function(cid, aid){
			var accts = fbutil.firebaseArray('account_category/'+cid+'/accounts');
			return accts.$remove(aid);
		},
		"remove": function(cid){
			var cats = fbutil.firebaseArray('account_category/');
			return cats.$remove(cid);
		},
		"load": function(cid, callback){
			fbutil.firebaseObject('account_category/'+cid).$loaded(callback);
		},
		"all": fbutil.firebaseArray('account_category'),
		"bank": function(){
			var ref = fbutil.ref('account_category').orderByChild('type').equalTo('bank');
			return fbutil.arrayFromRef(ref);
		},
		"income": function(){
			var ref = fbutil.ref('account_category').orderByChild('type').equalTo('income');
			return fbutil.arrayFromRef(ref);
		},
		"expense": function(){
			var ref = fbutil.ref('account_category').orderByChild('type').equalTo('expense');
			return fbutil.arrayFromRef(ref);
		}
	};
}])

.factory('Account', ['fbutil', function(fbutil){
	return {
		"all": fbutil.firebaseArray('account'),
		"query": function(aid){
			return fbutil.firebaseObject('account/'+aid);
		},
		"load": function(aid, callback){
			fbutil.firebaseObject('account/'+aid).$loaded(callback);
		},
		"remove": function(aid){
			var accts = fbutil.firebaseArray('account/');
			return accts.$remove(aid);
		},
		"getAcctsInCategory": function(cid){
			return fbutil.firebaseArray('account_category/'+cid+'/accounts');
		},
		"bank": function(){
			var ref = fbutil.ref('account').orderByChild('category_type').equalTo('bank');
			return fbutil.arrayFromRef(ref);
		},
		"income": function(){
			var ref = fbutil.ref('account').orderByChild('category_type').equalTo('income');
			return fbutil.arrayFromRef(ref);
		},
		"expense": function(){
			var ref = fbutil.ref('account').orderByChild('category_type').equalTo('expense');
			return fbutil.arrayFromRef(ref);
		}
	};
}])

.factory('Transaction', ['fbutil', function(fbutil){
	return {
		"getAll": function(){
			return fbutil.firebaseArray('transaction');
		},
		"addNewTransaction": function(trans){
			fbutil.firebaseArray('transaction').$add(trans);
		},
		"load": function(tid, callback){
			return fbutil.firebaseObject('transaction/'+tid).$loaded(callback);
		},
		"remove": function(tid){
			var trans = fbutil.firebaseArray('transaction/');
			return trans.$remove(tid);
		},
		"getAllInRange": function(startDateUnix, endDateUnix){
			var ref = fbutil.ref('transaction').orderByChild('timestamp').startAt(startDateUnix).endAt(endDateUnix);
			return fbutil.arrayFromRef(ref);
		},
		"getForAccount": function(aid){
			var transactions = {};
			transactions['to'] = fbutil.arrayFromRef(fbutil.ref('transaction').orderByChild('to_account').equalTo(aid));
			transactions['from'] = fbutil.arrayFromRef(fbutil.ref('transaction').orderByChild('from_account').equalTo(aid));
			return transactions;
		}
	};
}])

.factory('FilterDate', ['fbutil', function(fbutil){
	return {
		date: new Date(),
		syncdate: function(){
			return fbutil.syncObject('filterDate', {});
		}
	};
}]);
/*
 * .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }]);
 */