'use strict';

angular.module('budgetTracker.services.utils', ['budgetTracker.services'])
.factory('ServiceUtils', ['Category', 'Account', 'Transaction', '$location',
	function (Category, Account, Transaction, $location) {
		return {
			deleteCategory: function (cid) {
				removeCategory(cid);
			},
			deleteAccount: function (cid, aid) {
				removeAccount(cid, aid, true);
			},
			deleteAccounts: function (cid, accountList) {
				angular.forEach(accountList, function (value, key) {
					removeAccount(cid, key, false);
				});
			},
			deleteTransaction: function (tid) {
				removeTransaction(tid, true);
			},
			getTransactionsByMonthYear: function (dateObj) {
				var firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
				var lastDay = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
				return Transaction.getAllInRange(firstDay.getTime(), lastDay.getTime());
			}
		};

		function returnHome() {
			$location.path('home');
		}

		function removeTransaction(tid, parentFunction) {
			var transPromise = Transaction.remove(tid);
			if (parentFunction) {
				transPromise.then(returnHome);
			}
		}

		function removeAccount(cid, aid, parentFunction) {
			var transOfAcct = Transaction.getForAccount(aid);
			for (var key in transOfAcct) {
				var transObj = transOfAcct[key];
				if (transObj.hasOwnProperty("$id")) {
					removeTransaction(transObj.$id, false);
				}
			}

			Category.removeAcct(cid, aid)
			.then(function (ref) {
				var acctPromise = Account.remove(aid);
				if (parentFunction) {
					acctPromise.then(returnHome());
				}
			});
		}

		function removeCategory(cid) {
			var acctsInCat = Account.getAcctsInCategory(cid);
			for (var acctId in acctsInCat) {
				removeAccount(acctId, false);
			}

			Category.remove(cid).then(returnHome());
		}
	}]);