'use strict';

// Declare app level module which depends on filters, and services
angular.module('budgetTracker.config', ['mgcrea.ngStrap'])

  // configuring our datepicker here so that we don't have to clutter html 
  // instances with a lot of data-* attributes
  .config(function($datepickerProvider) {
		angular.extend($datepickerProvider.defaults, {
			//Since there are more month-selection datepicker instances, defaults go to support them
			startWeek: 0,
			autoclose: true,
			startDate: "today",
			dateType: "date",
			dateFormat: "MMMM y",
			minView: "1"
			//For reference, here are the defaults expected for a regular date selection
			//You'll need to manually specify these locally
			/*
			dateFormat: "mediumDate", //"MMM d, y"
			dateType: "number", //unix timestamp
			minView: "0",
			 */
	  });
  })
  
  // version of this seed app is compatible with angularFire 0.6
  // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
  .constant('version', '0.8.2')

  // where to redirect users if they need to authenticate (see routeSecurity.js)
  .constant('loginRedirectPath', '/login')

  // your Firebase data URL goes here, no trailing slash
  .constant('FBURL', 'https://budgettracker2.firebaseio.com')

  // double check that the app has been configured before running it and blowing up space and time
  .run(['FBURL', '$timeout', function(FBURL, $timeout) {
    if( FBURL.match('///budgettracker2.firebaseio.com/') ) {
      angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
      $timeout(function() {
        angular.element(document.body).removeClass('hide');
      }, 250);
    }
  }]);

