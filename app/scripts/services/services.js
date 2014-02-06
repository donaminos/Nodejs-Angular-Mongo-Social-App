define(['angular'], function(angular) {
  'use strict';
  var services = angular.module('services', []);

  services.factory('Users', ['$resource', function($resource) {
    return $resource('/users');
  }]);

  /**
   * User authentication service
   */
  services.factory('AuthService', ['$http', '$rootScope', '$cookieStore', function($http, $rootScope, $cookieStore) {
    return {
      isLoggedIn: function() {
        return ($cookieStore.get('user') != undefined);
      },

      login: function(user) {
        $cookieStore.put('user', user);
        $rootScope.$broadcast('login');
      },

      logout: function() {
        $cookieStore.remove('user');
        $rootScope.$broadcast('logout');
      },

      userData: function() {
        return $cookieStore.get('user');
      },

      checkLoginStatus: function(success, error) {
        $http.get('/users/authenticated').success(function(data) {
          $cookieStore.put('user', data);
          success();
        }).error(error);
      }
    };
  }]);
});
