'use strict';

angular.module('budgetTracker.services.utils', ['budgetTracker.services'])
   .factory('ServiceUtils', ['Category', 'Account', 'Transaction', '$location', 
		function(Category, Account, Transaction, $location) {
			return {
				deleteCategory: function(cid){
					removeCategory(cid);
				},
				deleteAccount: function(cid, aid){
					removeAccount(cid, aid);
				},
				deleteTransaction: function(tid){
					removeTransaction(tid);
				}
			};
			
			function removeTransaction(tid){
				
			}
			
			function removeAccount(cid, aid){
				/*
				 * foreach transaction of account, removeTransaction()
				 */
				Category.removeAcct(cid, aid)
				.then(function(ref){
					Account.remove(aid)
					.then(function(innerRef){
						$location.path('home');
					});
				});
			}
			
			function removeCategory(cid){
				/*
				 * foreach account in category, removeAccount()
				 */
				
				Category.remove(cid).then(function(ref){
					$location.path('home');
				});
			}
		}]);