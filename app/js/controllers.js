'use strict';

/* Controllers */

var budgetTrackerControllers = angular.module('budgetTrackerControllers', []);

budgetTrackerControllers.controller('IndexCtrl', 
  ['$scope', 'Account', 'Transaction', 
  function($scope, Account, Transaction) {
    /*$scope.phones = Phone.query();
    $scope.orderProp = 'age';*/
  }]);

/*budgetTrackerControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);*/

budgetTrackerControllers.controller('AccountCtrl', 
  ['$scope', '$routeParams', 'Account', 'Transaction', 
  function($scope, $routeParams, Account, Transaction) {
    
  }]);

budgetTrackerControllers.controller('TransactionCtrl', ['$scope', '$routeParams', 'Transaction',
  function($scope, $routeParams, Transaction) {
    
  }]);