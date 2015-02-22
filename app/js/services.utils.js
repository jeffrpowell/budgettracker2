'use strict';

angular.module('budgetTracker.services.utils', ['budgetTracker.services'])
   .factory('ServiceUtils', ['Category', 'Account', 'Transaction', '$location', 
		function(Category, Account, Transaction, $location) {
			return {
				deleteCategory: function(cid){
					removeCategory(cid);
				},
				deleteAccount: function(cid, aid){
					removeAccount(cid, aid, true);
				},
				deleteTransaction: function(tid){
					removeTransaction(tid, true);
				},
				getTransactionsByMonthYear: function(dateObj){
					var firstDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
					var lastDay = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0);
					return Transaction.getInRange(firstDay.getTime(), lastDay.getTime());
				}
			};
			
			function returnHome(){
				$location.path('home');
			}
			
			function removeTransaction(tid, parentFunction){
				var transPromise = Transaction.remove(tid);
				if (parentFunction){
					transPromise.then(returnHome());
				}
			}
			
			function removeAccount(cid, aid, parentFunction){
				/*
				 * foreach transaction of account, removeTransaction(tid, false)
				 */
				
				Category.removeAcct(cid, aid)
				.then(function(ref){
					var acctPromise = Account.remove(aid);
					if (parentFunction){
						acctPromise.then(returnHome());
					}
				});
			}
			
			function removeCategory(cid){
				/*
				 * foreach account in category, removeAccount(cid, aid, false)
				 */
				
				Category.remove(cid).then(returnHome());
			}
		}]);