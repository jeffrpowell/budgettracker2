'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(function() {
    module('mock.firebase');
    module('budgetTracker.controllers');
  });

  describe('HomeCtrl', function() {
    var homeCtrl, $scope;
    beforeEach(function() {
      module(function($provide) {
        // comes from routes.js in the resolve: {} attribute
        $provide.value('user', {uid: 'test123'});
      });
      inject(function($controller) {
        $scope = {};
        homeCtrl = $controller('HomeCtrl', {$scope: $scope});
      });
    });

    it('should create user in scope', function() {
      expect($scope.user).toBeDefined();
    });
  });

  describe('LoginCtrl', function() {
    var loginCtrl, $scope;
    beforeEach(function() {
      inject(function($controller) {
        $scope = {};
        loginCtrl = $controller('LoginCtrl', {$scope: $scope});
      })
    });

    it('should define login function', function() {
      expect($scope.login).toBeA('function');
    });
  });
});
