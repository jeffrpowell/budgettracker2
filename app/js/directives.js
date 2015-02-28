'use strict';

/* Directives */


angular.module('budgetTracker.directives', ['simpleLogin'])

  .directive('appVersion', ['version', function(version) {
    return function(scope, elm) {
      elm.text(version);
    };
  }])

  /**
   * A directive that shows elements only when user is logged in.
   */
  .directive('ngShowAuth', ['simpleLogin', '$timeout', function (simpleLogin, $timeout) {
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !isLoggedIn);
          }, 0);
        }

        update();
        simpleLogin.watch(update, scope);
      }
    };
  }])

  /**
   * A directive that shows elements only when user is logged out.
   */
  .directive('ngHideAuth', ['simpleLogin', '$timeout', function (simpleLogin, $timeout) {
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        function update() {
          el.addClass('ng-cloak'); // hide until we process it

          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', isLoggedIn !== false);
          }, 0);
        }

        update();
        simpleLogin.watch(update, scope);
      }
    };
  }])
  
	.directive('monthSelection', ['FilterDate', function(FilterDate){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: function(elem, attr){
				return 'partials/widgets/monthSelection'+attr.mode+'.html'
			},
			scope: {
				onDateSelected: '&'
			},
			link: function(scope, element, attrs){
				scope.filterDate = FilterDate.date;
				var updateDate = function(){
					FilterDate.date = scope.filterDate;
					scope.onDateSelected({newDate: scope.filterDate});
				};
				scope.$watch('filterDate', function(oldVal, newVal) {
					if(newVal!==undefined && newVal) {
						updateDate();
					}
				});
			}
		};
	}]);
  
  /*.directive('ngCategorysummary', ['Category', function(Category){
	return {
		restrict: 'A', //<tr ng-accountsummary>
		require: '^ngModel',
		scope: {
			ngCategory: '=' //ng-category="$id"
		},
		templateUrl: 'partials/ng-categorysummary-template.html',
		replace: true,
		link: function(scope, iElement, iAttrs) {
			Category.query(iAttrs.ngCategory).$loaded(function(loadedAcct){
				scope.acct = loadedAcct;
			});
		}
	};
  }])
  
  .directive('ngAccountsummary', ['Account', function(Account){
	return {
		restrict: 'A', //<tr ng-accountsummary>
		require: '^ngModel',
		scope: {
			ngAccount: '@' //ng-account="$id"
		},
		templateUrl: 'partials/ng-accountsummary-template.html',
		replace: true,
		link: function(scope, iElement, iAttrs) {
			Account.query(iAttrs.ngAccount).$loaded(function(loadedAcct){
				scope.acct = loadedAcct;
			});
		}
	};
  }]);*/
