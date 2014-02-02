define([
    'angular', 
    'angularResource',
    'angularRoute',
    'angularCookie',
    'controllers/controllers',
    'directives/directives',
    'filters/filters',
    'services/services'
  ],
  function(angular) {
    var deps = [
      'ngResource',
      'ngRoute',
      'ngCookies',
      'controllers',
      'services',
      'directives',
      'filters'
    ];

    return angular.module('socialApp', deps);
});
