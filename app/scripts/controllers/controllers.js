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

  /**
   * User login controller
   */
  controllers.controller('LoginController', ['$scope', '$http', '$location', 'AuthService', function($scope, $http, $location, AuthService) {
    // If user is already authenticated, redirect to frontpage
    if (AuthService.isLoggedIn()) {
      $location.path('/');
    }

    $scope.login = function() {
      $http.post('/users/login', {
        email: $scope.email,
        password: $scope.password
      }).
      success(function(data) {
        AuthService.setUserData(data);
        $location.path('/');
      }).
      error(function(data) {
        $scope.login_message = 'Login failed';
      });

      return false;
    };
  }]);

  /**
   * User sign-up controller
   */
  controllers.controller('SignupController', ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
    // If user is already authenticated, redirect to frontpage
    if ($rootScope.me) {
      $location.path('/');
    }

    $scope.signup = function() {
      var user = $scope.user;
      $rootScope.signup_success = false;

      $http.post('/users/register', user).
      success(function(data, status) {
        if (data.status == 'ok') {
          $rootScope.signup_success = true;
          $location.path('/users/login');
        } else {
          $scope.signup_message = data.message;
        }
      }).
      error(function(data, status) {
          $scope.signup_message = 'Failed to register new account';
      });
    };
  }]);

  /**
   * User log-out
   */
  controllers.controller('LogoutController', ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
    $scope.logout = function() {
      // Do nothing if user is not logged in
      if ($rootScope.me == undefined) {
        console.log('not logged in');
        return;
      }

      $http.get('/users/logout')
      .success(function() {
        $rootScope.me = null;
        $location.path('/');
      });
    };
  }]);


  /**
   * Navigation bar controller
   */
  controllers.controller('NavigationController', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.user = AuthService.userData();
  }]);

  /**
   * My account controller
   */
  controllers.controller('MyAccountController', ['$scope', '$http', '$rootScope', '$location', function($scope, $http, $rootScope, $location) {
    $scope.user = $rootScope.me;

    $scope.save = function() {
    };
  }]);
});
