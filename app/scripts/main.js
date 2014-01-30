require.config({
  paths: {
    // jQuery by default exports jquery object to requirejs
    jquery: '../bower_components/jquery/jquery.min',
    angular: '../bower_components/angular/angular.min',
    angularResource: '../bower_components/angular-resource/angular-resource.min',
    angularRoute: '../bower_components/angular-route/angular-route.min',
    domReady: '../bower_components/requirejs-domready/domReady'
  },

  shim: {
    // Angular doesn't support requirejs so need to export angular object explicitly
    angular: {
      exports: 'angular'
    },

    angularResource: {
      deps: ['angular']
    },

    angularRoute: {
      deps: ['angular']
    }
  }
});

require(['app', 'route', 'bootstrap'], function(app) {
});

