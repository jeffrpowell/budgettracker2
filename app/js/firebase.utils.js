
// a simple wrapper on Firebase and AngularFire to simplify deps and keep things DRY
angular.module('firebase.utils', ['firebase', 'budgetTracker.config'])

.factory('fbutil', ['$firebaseArray', '$firebaseObject', '$window', 'FBURL', 'CATEGORY_URL', 'ACCOUNT_URL', 'TRANSACTION_URL',
	function ($firebaseArray, $firebaseObject, $window, FBURL, CATEGORY_URL, ACCOUNT_URL, TRANSACTION_URL) {
		"use strict";
		
		return {
			ref: firebaseRef,
			categoryRef: function(cid){
				return firebaseRef(CATEGORY_URL + '/' + cid);
			},
			accountRef: function(aid){
				return firebaseRef(ACCOUNT_URL + '/' + aid);
			},
			transactionRef: function(tid){
				return firebaseRef(TRANSACTION_URL + '/' + tid);
			},
			categoryListRef: firebaseRef(CATEGORY_URL),
			accountListRef: firebaseRef(ACCOUNT_URL),
			transactionListRef: firebaseRef(TRANSACTION_URL),
			firebaseArray: function (path) {
				return $firebaseArray(firebaseRef(path));
			},
			firebaseObject: function (path) {
				return $firebaseObject(firebaseRef(path));
			},
			arrayFromRef: function (customRef) {
				return $firebaseArray(customRef);
			}
		};

		function pathRef(args) {
			for (var i = 0; i < args.length; i++) {
				if (angular.isArray(args[i])) {
					args[i] = pathRef(args[i]);
				}
				else if (typeof args[i] !== 'string') {
					throw new Error('Argument ' + i + ' to firebaseRef is not a string: ' + args[i]);
				}
			}
			return args.join('/');
		}

		/**
		 * Example:
		 * <code>
		 *    function(firebaseRef) {
		 *       var ref = firebaseRef('path/to/data');
		 *    }
		 * </code>
		 *
		 * @function
		 * @name firebaseRef
		 * @param {String|Array...} path relative path to the root folder in Firebase instance
		 * @return a Firebase instance
		 */
		function firebaseRef(path) {
			var ref = new $window.Firebase(FBURL);
			var args = Array.prototype.slice.call(arguments);
			if (args.length) {
				ref = ref.child(pathRef(args));
			}
			return ref;
		}
	}]);