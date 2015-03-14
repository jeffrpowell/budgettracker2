/**
* Wraps ng-cloak so that, instead of simply waiting for Angular to compile, it waits until
* simpleLogin resolves with the remote Firebase services.
*
* <code>
*    <div ng-cloak>Authentication has resolved.</div>
* </code>
*/
angular.module('budgetTracker.decorators', ['firebase.utils'])
  .config(['$provide', function($provide) {
    // adapt ng-cloak to wait for auth before it does its magic
    $provide.decorator('ngCloakDirective', ['$delegate', 'Auth',
      function($delegate, Auth) {
        var directive = $delegate[0];
        // make a copy of the old directive
        var _compile = directive.compile;
        directive.compile = function(element, attr) {
			var authData = Auth.$getAuth();
			if (authData){
				// after auth, run the original ng-cloak directive
				_compile.call(directive, element, attr);
			}
        };
        // return the modified directive
        return $delegate;
      }]);
  }]);