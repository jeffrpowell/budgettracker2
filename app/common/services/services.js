'use strict';

/* Services */

angular.module('budgetTracker.services', ['firebase.utils'])

.factory('Auth', ['fbutil', '$firebaseAuth', function (fbutil, $firebaseAuth) {
		return $firebaseAuth(fbutil.ref());
	}])

.factory('BudgetDate', ['fbutil', function (fbutil) {
		//Expects integer with date format 'yyyyMM'
		var getDateParts = function(budgetDate){
			var parts = {};
			parts.month = budgetDate % 100-1;
			parts.year = Math.floor(budgetDate / 100);
			return parts;
		};
		return {
			getBudgetDate: function () {
				return fbutil.firebaseObject('budgetDate').$loaded();
			},
			setBudgetDate: function(dateInt){
				fbutil.firebaseObject('budgetDate').$loaded(function($obj){
					$obj.$value = dateInt;
					$obj.$save();
				});
			},
			extractDateParts: function(budgetDate){
				return getDateParts(budgetDate);
			},
			findNextMonth: function(thisMonth){
				var parts = getDateParts(thisMonth);
				parts.month+=2;
				if (parts.month > 12){
					parts.month = 1;
					parts.year++;
				}
				return parts.year * 100 + parts.month;
			}
		};
	}])

.factory('Budget', ['fbutil', 'BudgetDate', function(fbutil, BudgetDate){
		return {
			/**
			 * 
			 * @param {Integer} date - yyyyMM
			 * @returns {Object} $firebaseObject representing the following structure
			 * {income: Integer,
			 *	categories: [
			 *		categoryKey: {
			 *			key: FirebaseKey
			 *			name: String,
			 *			envelopes: [
			 *				envelopeKey: {
			 *					allocation: Float
			 *					key: FirebaseKey
			 *					name: String
			 *					suggestion: Float
			 *					usage: Float
			 *				}
			 *			]
			 *		}
			 *	]
			 * }
			 */
			getBudgetForMonth: function(date){
				return fbutil.firebaseObject('budgetTotals/'+date);
			},
			updateNextMonthsSuggestion: function(thisMonthsDate, categoryKey, envelopeKey, amount){
				var nextMonth = BudgetDate.findNextMonth(thisMonthsDate);
				var nextMonthEnvelope = fbutil.firebaseObject('budgetTotals/'+nextMonth+'/categories/'+categoryKey+'/envelopes/'+envelopeKey);
				nextMonthEnvelope['suggestion'] = amount;
				nextMonthEnvelope.$save();
			}
		};
	}])

.factory('Categories', ['fbutil', function(fbutil){
		return {
			get: function(){
				return fbutil.firebaseObject('categories');
			},
			find: function(categoryKey){
				return fbutil.firebaseObject('categories/'+categoryKey);
			},
			add: function(name){
				var categories = fbutil.firebaseArray('categories');
				categories.$add({name: name}).then(function(ref){
					var key = ref.key();
					ref.child('key').set(key);
				});
			},
			remove: function(categoryKey){
				fbutil.firebaseObject('categories/'+categoryKey).$remove();
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
			},
			find: function(categoryKey, envelopeKey){
				return fbutil.firebaseObject('categories/'+categoryKey+'/envelopes/'+envelopeKey);
			},
			remove: function(categoryKey, envelopeKey){
				fbutil.firebaseObject('categories/'+categoryKey+'/envelopes/'+envelopeKey).$remove();
			}
		};
	}]);