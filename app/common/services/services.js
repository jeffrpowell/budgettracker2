'use strict';

/* Services */

angular.module('budgetTracker.services', ['firebase.utils'])

.factory('Auth', ['fbutil', '$firebaseAuth', function (fbutil, $firebaseAuth) {
		return $firebaseAuth(fbutil.ref());
	}])

.factory('BudgetDate', ['fbutil', function (fbutil) {
		return {
			getBudgetDate: function () {
				return fbutil.firebaseObject('budgetDate').$loaded();
			},
			setBudgetDate: function(dateInt){
				fbutil.firebaseObject('budgetDate').$loaded(function($obj){
					$obj.$value = dateInt;
					$obj.$save();
				});
			}
		};
	}])

.factory('Budget', ['fbutil', function(fbutil){
		return {
			/**
			 * 
			 * @param {Integer} date - yyyyMM
			 * @returns {Object} $firebaseObject representing the following structure
			 * {income: Integer,
			 *	categories: [
			 *		categoryKey: {
			 *			name: String,
			 *			envelopes: [
			 *				envelopeKey: {
			 *					allocation: Float
			 *					name: String
			 *					usage: Float
			 *				}
			 *			]
			 *		}
			 *	]
			 * }
			 */
			getBudgetForMonth: function(date){
				return fbutil.firebaseObject('budgetTotals/'+date);
			}
		};
	}])

.factory('Categories', ['fbutil', function(fbutil){
		return {
			get: function(){
				return fbutil.firebaseObject('categories');
			},
			add: function(name){
				var categories = fbutil.firebaseArray('categories');
				categories.$add({name: name}).then(function(ref){
					var key = ref.key();
					ref.child('key').set(key);
				});
			},
			update: function(categoryObj){
				var baseRef = fbutil.ref('categories/'+categoryObj.key);
				angular.forEach(categoryObj, function(value, key){
					if (key !== "$$hashKey"){
						baseRef.child(key).set(value);
					}
				}, baseRef);
			}
		};
	}])

.factory('Envelopes', ['fbutil', function(fbutil){
		return {
			add: function(categoryKey, name){
				var categoryEnvelopes = fbutil.firebaseArray('categories/'+categoryKey+'/envelopes');
				categoryEnvelopes.$add({name: name}).then(function(ref){
					var key = ref.key();
					ref.child('key').set(key);
				});
			}
		};
	}]);