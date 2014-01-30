define(['angular'], function(angular) {
  'use strict';
  var services = angular.module('services', []);

  services.factory('Users', ['$resource', function($resource) {
    return $resource('/users');
  }]);
});
