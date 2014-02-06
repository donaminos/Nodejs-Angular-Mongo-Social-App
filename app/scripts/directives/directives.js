define(['angular'], function(angular) {
  'use strict';
  var directives = angular.module('directives', []);

  directives.directive('loading', ['$rootScope', function($rootScope) {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      template: '<h2><span ng-transclude/></h2>',
      link: function(scope, element, attrs) {
        element.addClass('ng-hide');

        $rootScope.$on('$routeChangeStart', function(event, next, current) {
          element.removeClass('ng-hide');
        });

        $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
          element.addClass('ng-hide');
        });
      }
    };
  }]);


  /**
   * Directive for displaying status messages
   */
  directives.directive('statusMessage',['StatusMessage', function(StatusMessage) {
    return {
      restrict: 'E',
      replace: true,
      link: function(scope, elem, attrs) {
        var messages = $rootScope.messages;

        if (!messages || messages.length <= 0) {
          return;
        }

        for (var type in messages) {
        }
      }
    };
  });

  directives.directive('hello', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        title: '@contentTitle'
      },
      template: '<h1>Hello, {{title}}<span ng-transclude/></h1>',
    };
  });

  directives.directive('expander', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        title: '@expanderTitle'
      },
      template: '<div class="expander">' +
                  '<div class="title" ng-click="toggle()">{{title}}</div>' +
                  '<p ng-show="expanded" ng-transclude></p>' + 
                '</div>',
      link: function(scope, element, attrs) {
        scope.expanded = false;
        scope.toggle = function() {
          scope.expanded = !scope.expanded;
        };
      }
    };
  });
});
