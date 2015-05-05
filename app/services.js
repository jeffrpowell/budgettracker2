'use strict';

/* Services */

angular.module('budgetTracker.services', ['firebase.utils'])

.factory('Auth', ['fbutil', '$firebaseAuth', function (fbutil, $firebaseAuth) {
		return $firebaseAuth(fbutil.ref());
	}])

.factory('Date', ['fbutil', function (fbutil) {
		return {
			getFirebaseDate: fbutil.syncObject('filterDate', {})
		};
	}]);