define(['angular'], function(angular) {
  'use strict';
  var filters = angular.module('filters', []);

  filters.filter('fullName', function() {
    return function(user) {
      if (user) {
        return user.name.first_name + ' ' + user.name.last_name;
      }
      return null;
    };
  });
});
