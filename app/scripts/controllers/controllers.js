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
      return;
    }

    AuthService.logout();

    $scope.login = function() {
      $http.post('/users/login', {
        email: $scope.email,
        password: $scope.password

      }).success(function(data) {
        AuthService.login(data);
        $location.path('/');

      }).error(function(data) {
        $scope.login_message = 'Login failed';
      });

      return false;
    };
  }]);

  /**
   * User sign-up controller
   */
  controllers.controller('SignupController', ['$scope', '$http', '$rootScope', 'AuthService', '$location', function($scope, $http, $rootScope, AuthService, $location) {
    // If user is already authenticated, redirect to frontpage
    if (AuthService.isLoggedIn()) {
      $location.path('/');
      return;
    }

    $scope.signup = function() {
      var user = $scope.user;
      $rootScope.signup_success = false;

      $http.post('/users/register', user).success(function(data, status) {
        if (data.status == 'ok') {
          $rootScope.signup_success = true;
          $location.path('/users/login');
        } else {
          $scope.signup_message = data.message;
        }
      }).error(function(data, status) {
          $scope.signup_message = 'Failed to register new account';
      });
    };
  }]);

  /**
   * User log-out
   */
  controllers.controller('LogoutController', ['$scope', '$rootScope', '$http', 'AuthService', '$location', function($scope, $rootScope, $http, AuthService, $location) {
    $scope.logout = function() {
      $http.get('/users/logout').success(function() {
        AuthService.logout();
        $location.path('/');
      });
    };
  }]);


  /**
   * Navigation bar controller
   */
  controllers.controller('NavigationController', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.user = AuthService.userData();

    $scope.$on('logout', function() {
      $scope.user = null;
    });

    $scope.$on('login', function() {
      $scope.user = AuthService.userData();
    });

    // Mark the active menu item when path is changing
    $scope.$on('$routeChangeSuccess', function(event, current, prev) {
      $('#main-navbar')
      .find('li')
      .removeClass('active')
      .end()
      .find('a[href="#' + current.originalPath + '"]')
      .parent()
      .addClass('active');
    });
  }]);

  /**
   * My account controller
   */
  controllers.controller('MyAccountController', ['$scope', '$http', 'AuthService', '$location', function($scope, $http, AuthService, $location) {
    var user = AuthService.userData();

    if (!user) {
      return $location.path('/users/login');
    }

    $http.get('/users/' + user._id).success(function(data) {
      $scope.user = data[0];
    }).error(function() {
      $location.path('/users/login');
    });
  }]);
});
