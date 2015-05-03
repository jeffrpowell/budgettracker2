'use strict';

/* Services */

angular.module('budgetTracker.services', ['firebase.utils'])

.factory('Auth', ['fbutil', '$firebaseAuth', function (fbutil, $firebaseAuth) {
		return $firebaseAuth(fbutil.ref());
	}])

.factory('FilterDate', ['fbutil', function (fbutil) {
		return {
			date: new Date(),
			syncdate: function () {
				return fbutil.syncObject('filterDate', {});
			}
		};
	}]);