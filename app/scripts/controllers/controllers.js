define(['angular'], function(angular) {
  'use strict';
  var controllers = angular.module('controllers', []);

  /**
   * Index controller
   */
  controllers.controller('IndexController', ['$scope', function($scope) {
    $scope.name = 'Phi Van Ngoc';
  }]);

  /**
   * User controller
   */
  controllers.controller('UserController', ['$scope', 'Users', function($scope, Users) {
    var users = Users.query();
    $scope.users = users;
  }]);

});
