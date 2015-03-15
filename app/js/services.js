'use strict';

/* Services */

angular.module('budgetTracker.services', [])

.factory('Auth', ['fbutil', '$firebaseAuth', function (fbutil, $firebaseAuth) {
		return $firebaseAuth(fbutil.ref());
	}])

.factory("CategoryObject", ['$firebaseObject', 'fbutil', 'CATEGORY_URL', 'AccountObject',
	function ($firebaseObject, fbutil, CATEGORY_URL, AccountObject) {
		function getAccountList(cid) {
			return new AccountList(fbutil.ref(CATEGORY_URL + '/' + cid + "/accounts"));
		}

		return $firebaseObject.$extend({
			$getAccounts: function () {
				return getAccountList(this.$id);
			},
			$delete: function () {
				var accountList = getAccountList(this.$id);
				angular.forEach(accountList, function (value, key) {
					var acct = new AccountObject(fbutil.accountRef(key));
					acct.$delete();
				});
				this.$remove();
			}
		});
	}])

.factory("AccountObject", ['$firebaseObject', 'fbutil', 
	function ($firebaseObject, fbutil) {
		function getTransactionList() {

		}

		return $firebaseObject.$extend({
			$getCategory: function () {
				return new CategoryObject(fbutil.categoryRef(this.category));
			},
			$getParentAccount: function () {
				//Unable to return an instance of AccountObject due to creating a circular dependency
				return $firebaseObject(fbutil.accountRef(this.parent_account));
			},
			$getTransactions: function () {
				return getTransactionList();
			},
			$amountToAccount: function(amount){
				this.amount += amount;
				this.$save();
			},	
			$amountFromAccount: function(amount){
				this.amount -= amount;
				this.$save();
			},	
			$delete: function () {
				var transactionList = getTransactionList();
				//delete
			}
		});
	}])

.factory("TransactionObject", ['$firebaseObject', 'fbutil', 'AccountObject',
	function ($firebaseObject, fbutil, AccountObject) {
		return $firebaseObject.$extend({
			$delete: function(){
				var from_account = new AccountObject(fbutil.accountRef(this.from_account));
				var to_account = new AccountObject(fbutil.accountRef(this.to_account));
				//Reverse the transaction between the accounts
				from_account.$amountToAccount(this.amount);
				to_account.$amountFromAccount(this.amount);
				this.$remove();
			}
		});
	}])

.factory("CategoryList", ['$firebaseArray', 'fbutil',
	function ($firebaseArray, fbutil) {
		return $firebaseArray.$extend({
			$getCategory: function (cid) {
				return new CategoryObject(fbutil.categoryRef(cid));
			}
		});
	}])

.factory("AccountList", ['$firebaseArray', 'AccountObject', 'fbutil',
	function ($firebaseArray, AccountObject, fbutil) {
		return $firebaseArray.$extend({
			$getAccount: function (aid) {
				return new AccountObject(fbutil.accountRef(aid));
			}
		});
	}])

.factory("TransactionList", ['$firebaseArray', 'fbutil',
	function ($firebaseArray, fbutil) {
		return $firebaseArray.$extend({
			$getTransaction: function (tid) {
				return new TransactionObject(fbutil.transactionRef(tid));
			}
		});
	}])

.factory("ModelInstances", ['fbutil', 'CategoryList', 'AccountList', 'TransactionList',
	function (fbutil, CategoryList, AccountList, TransactionList) {
		return {
			categoryList: new CategoryList(fbutil.categoryListRef),
			accountList: new AccountList(fbutil.accountListRef),
			transactionList: new TransactionList(fbutil.transactionListRef),
			getCategory: function(cid){
				return new CategoryObject(fbutil.categoryRef(cid));
			},
			getAccount: function(aid){
				return new AccountObject(fbutil.accountRef(aid));
			},
			getTransaction: function(tid){
				new TransactionObject(fbutil.transactionRef(tid));
			}
		};
	}])

.factory('Category', ['fbutil', function (fbutil) {
		return {
			"customArr": function (path) {
				return fbutil.firebaseArray('account_category/' + path);
			},
			"customObj": function (path) {
				return fbutil.firebaseObject('account_category/' + path);
			},
			"addAcct": function (cid, aid) {
				var arr = fbutil.firebaseArray('account_category/' + cid + '/accounts');
				return arr.$set(aid, aid);
			},
			"removeAcct": function (cid, aid) {
				var accts = fbutil.firebaseArray('account_category/' + cid + '/accounts');
				return accts.$remove(aid);
			},
			"remove": function (cid) {
				var cats = fbutil.firebaseArray('account_category/');
				return cats.$remove(cid);
			},
			"load": function (cid, callback) {
				fbutil.firebaseObject('account_category/' + cid).$loaded(callback);
			},
			"all": fbutil.firebaseArray('account_category'),
			"bank": function () {
				var ref = fbutil.ref('account_category').orderByChild('type').equalTo('bank');
				return fbutil.arrayFromRef(ref);
			},
			"income": function () {
				var ref = fbutil.ref('account_category').orderByChild('type').equalTo('income');
				return fbutil.arrayFromRef(ref);
			},
			"expense": function () {
				var ref = fbutil.ref('account_category').orderByChild('type').equalTo('expense');
				return fbutil.arrayFromRef(ref);
			}
		};
	}])

.factory('Account', ['fbutil', function (fbutil) {
		return {
			"all": fbutil.firebaseArray('account'),
			"query": function (aid) {
				return fbutil.firebaseObject('account/' + aid);
			},
			"load": function (aid, callback) {
				fbutil.firebaseObject('account/' + aid).$loaded(callback);
			},
			"remove": function (aid) {
				var accts = fbutil.firebaseArray('account/');
				return accts.$remove(aid);
			},
			"getAcctsInCategory": function (cid) {
				return fbutil.firebaseArray('account_category/' + cid + '/accounts');
			},
			"bank": function () {
				var ref = fbutil.ref('account').orderByChild('category_type').equalTo('bank');
				return fbutil.arrayFromRef(ref);
			},
			"income": function () {
				var ref = fbutil.ref('account').orderByChild('category_type').equalTo('income');
				return fbutil.arrayFromRef(ref);
			},
			"expense": function () {
				var ref = fbutil.ref('account').orderByChild('category_type').equalTo('expense');
				return fbutil.arrayFromRef(ref);
			}
		};
	}])

.factory('Transaction', ['fbutil', function (fbutil) {
		return {
			"getAll": function () {
				return fbutil.firebaseArray('transaction');
			},
			"addNewTransaction": function (trans) {
				fbutil.firebaseArray('transaction').$add(trans);
			},
			"load": function (tid, callback) {
				return fbutil.firebaseObject('transaction/' + tid).$loaded(callback);
			},
			"remove": function (tid) {
				var trans = fbutil.firebaseArray('transaction/');
				return trans.$remove(tid);
			},
			"getAllInRange": function (startDateUnix, endDateUnix) {
				var ref = fbutil.ref('transaction').orderByChild('timestamp').startAt(startDateUnix).endAt(endDateUnix);
				return fbutil.arrayFromRef(ref);
			},
			"getForAccount": function (aid) {
				var transactions = {};
				transactions['to'] = fbutil.arrayFromRef(fbutil.ref('transaction').orderByChild('to_account').equalTo(aid));
				transactions['from'] = fbutil.arrayFromRef(fbutil.ref('transaction').orderByChild('from_account').equalTo(aid));
				return transactions;
			}
		};
	}])

.factory('FilterDate', ['fbutil', function (fbutil) {
		return {
			date: new Date(),
			syncdate: function () {
				return fbutil.syncObject('filterDate', {});
			}
		};
	}]);
/*
 * .factory('messageList', ['fbutil', function(fbutil) {
 return fbutil.syncArray('messages', {limit: 10, endAt: null});
 }]);
 */