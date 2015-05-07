'use strict';

/* Services */

angular.module('budgetTracker.services', ['firebase.utils'])

.factory('Auth', ['fbutil', '$firebaseAuth', function (fbutil, $firebaseAuth) {
		return $firebaseAuth(fbutil.ref());
	}])

.factory('Date', ['fbutil', function (fbutil) {
		return {
			getFirebaseDate: fbutil.firebaseObject('filterDate')
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
				fbutil.firebaseArray('budgetTotals/'+date+'/categories').$loaded(function(vals){
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
				});
				return budgetObj;
			}
		};
	}]);