define(['app'], function(app) {
  var routes = {
    '/': {
      controller: 'IndexController',
      templateUrl: 'views/main.html',
      loginRequired: true
    },
    '/users/login': {
      controller: 'LoginController',
      templateUrl: 'views/login.html'
    },
    '/users/register': {
      controller: 'SignupController',
      templateUrl: 'views/register.html'
    },
    '/users/account': {
      controller: 'MyAccountController',
      templateUrl: 'views/profile.html',
      loginRequired: true,
    }
  };

  app.config(['$routeProvider', function($routeProvider) {
    for(var path in routes) {
      $routeProvider.when(path, routes[path]);
    }

    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }]);

  app.run(['$rootScope', '$location', 'AuthService', function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.loginRequired && !AuthService.isLoggedIn()) {
        $location.path('/users/login');
        event.preventDefault();
        return;
      }
    });

    // Check user login status every time the app is loaded
    AuthService.checkLoginStatus(function() {
    }, function() {
      $location.path('/users/login');
    });
  }]);
});
