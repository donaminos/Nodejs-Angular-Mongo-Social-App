define(['app'], function(app) {
  var route = function($routeProvider) {
    $routeProvider.
    when('/', {
      controller: 'IndexController',
      templateUrl: 'views/main.html'
    }).
    when('/users', {
      controller: 'UserController',
      templateUrl: 'views/users.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  };

  app.config(route);
});
