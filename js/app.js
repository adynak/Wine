var wineInventory = angular.module('wineInventory',
        [
            'ngRoute',
            'ngAnimate',
            'ngTouch',
            'ui.grid',
            'ui.grid.edit',
            'ngMessages',
            'ui.grid.grouping',
            'ui.bootstrap',
            'ui.grid.selection',
            'ui.grid.resizeColumns'
        ]);

wineInventory.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider.
    when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    }).
    when('/viewVarietal', {
        templateUrl: 'views/gridVarietalVintage/viewVarietal.html',
        controller: 'ViewVarietalController',
    }).
    when('/viewProducer', {
        templateUrl: 'views/gridProducerVarietal/viewProducer.html',
        controller: 'ViewProducerController',
    }).
    when('/viewReconcile', {
        templateUrl: 'views/gridReconcileInventory/viewReconcile.html',
        controller: 'ViewReconcileController',
    }).
    when('/viewMissingInventory', {
        templateUrl: 'views/gridMissingInventory/viewMissingInventory.html',
        controller: 'ViewMissingInventoryController',
    }).
    otherwise({
        redirectTo: '/home'
    });


}]).run(function($rootScope, $location, Data) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        // thre is nothing special that we need to do here for this application
    });
});
