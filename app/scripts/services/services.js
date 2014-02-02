define(['angular'], function(angular) {
  'use strict';
  var services = angular.module('services', []);

  services.factory('Users', ['$resource', function($resource) {
    return $resource('/users');
  }]);

  /**
   * User authentication service
   */
  services.factory('AuthService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var user = $cookieStore.get('user') || null;

    return {
      isLoggedIn: function() {
        return user;
      },

      userData: function() {
        return user;
      },

      setUserData: function(data) {
        user = data;
      },

      checkLoginStatus: function(success, error) {
        $http.get('/users/authenticated').success(function(data) {
          user = data;
          $cookieStore.put('user', data);
          success();
        }).error(error);
      }
    };
  }]);
});
