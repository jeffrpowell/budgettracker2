'use strict';

angular.module('budgetTracker.login.directives', ['budgetTracker.services'])

/**
 * A directive that shows elements only when user is logged in.
 */
.directive('ngShowAuth', ['Auth', '$timeout', function (Auth, $timeout) {
		var isLoggedIn;
		Auth.$onAuth(function (authData) {
			isLoggedIn = !!authData;
		});

		return {
			restrict: 'A',
			link: function (scope, el) {
				el.addClass('ng-cloak'); // hide until we process it

				function update() {
					// sometimes if ngCloak exists on same element, they argue, so make sure that
					// this one always runs last for reliability
					$timeout(function () {
						el.toggleClass('ng-cloak', !isLoggedIn);
					}, 0);
				}

				update();
				Auth.$onAuth(update, scope);
			}
		};
	}])

/**
 * A directive that shows elements only when user is logged out.
 */
.directive('ngHideAuth', ['Auth', '$timeout', function (Auth, $timeout) {
		var isLoggedIn;
		Auth.$onAuth(function (authData) {
			isLoggedIn = !!authData;
		});

		return {
			restrict: 'A',
			link: function (scope, el) {
				function update() {
					el.addClass('ng-cloak'); // hide until we process it

					// sometimes if ngCloak exists on same element, they argue, so make sure that
					// this one always runs last for reliability
					$timeout(function () {
						el.toggleClass('ng-cloak', isLoggedIn !== false);
					}, 0);
				}

				update();
				Auth.$onAuth(update, scope);
			}
		};
	}]);