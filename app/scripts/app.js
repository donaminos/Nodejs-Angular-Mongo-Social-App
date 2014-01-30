define([
    'angular', 
    'angularResource',
    'angularRoute',
    'controllers/controllers',
    'directives/directives',
    'filters/filters',
    'services/services'
  ],
  function(angular) {
    return angular.module('socialApp', ['ngResource', 'ngRoute', 'controllers', 'services', 'directives', 'filters']);
});
