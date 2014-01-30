define(['angular', 'app', 'domReady'], function(angular, app, domReady) {
  // Bootstrap angular app when dom is fully loaded
  domReady(function() {
    angular.bootstrap(document, ['socialApp']);
  });
});
