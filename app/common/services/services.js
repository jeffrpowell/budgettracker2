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
		var budgetObj = {
			income: 0,
			categories: []
		};
		return {
			getBudgetForMonth: function(date){
				budgetObj.income = fbutil.firebaseObject('budgetTotals/'+date+'/income');
				return fbutil.firebaseObject('budgetTotals/'+date);/*.$loaded(function(vals){
					var categories = [];
					angular.forEach(vals, function(categoryValue, dummyCategoryKey){
						var envelopes = [];
						angular.forEach(categoryValue.envelopes, function(envelopeValue, dummyEnvelopeKey){
							if (envelopeValue !== undefined){
								envelopes.push(envelopeValue);
							}
						}, envelopes);
						this.push({name: categoryValue.name, envelopes: envelopes});
					}, categories);
					budgetObj.categories = categories;
					return budgetObj;
				});*/
			}
		};
	}])

.factory('Categories', ['fbutil', function(fbutil){
		return fbutil.firebaseArray('categories');
	}]);