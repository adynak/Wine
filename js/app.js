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
            'ui.grid.resizeColumns',
            'ui.grid.autoResize'
        ]);

wineInventory.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');
        // $locationProvider.html5Mode(true);


    $routeProvider.
    when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        params: {name:"abc"}
    }).
    when('/desktop/viewVarietal', {
        templateUrl: 'views/desktop/gridVarietalVintage/viewVarietal.html',
        controller: 'DesktopViewVarietalController',
    }).
    when('/desktop/viewProducer', {
        templateUrl: 'views/desktop/gridProducerVarietal/viewProducer.html',
        controller: 'DesktopViewProducerController',
    }).
    when('/desktop/viewReadyToDrink', {
        templateUrl: 'views/desktop/gridReadyToDrink/viewReadyToDrink.html',
        controller: 'DesktopViewReadyToDrinkController',
    }).
    when('/desktop/viewMissingDrinkByDate', {
        templateUrl: 'views/desktop/gridProducerVarietal/viewProducer.html',
        controller: 'DesktopViewProducerController',
    }).    
    when('/viewReconcile', {
        templateUrl: 'views/desktop/gridReconcileInventory/viewReconcile.html',
        controller: 'DesktopViewReconcileController',
    }).
    when('/viewMissingInventory', {
        templateUrl: 'views/desktop/gridMissingInventory/viewMissingInventory.html',
        controller: 'DesktopViewMissingInventoryController',
    }).
    when('/iphone/viewVarietalVintage/home', {
        templateUrl: 'views/iPhone/gridViewVarietalVintage/viewVarietal.html',
        controller: 'iPhoneViewVarietalController',
    }).
    when('/iphone/viewVarietalVintage/viewVintage', {
        templateUrl: 'views/iPhone/gridViewVarietalVintage/viewVarietal.html',
        controller: 'iPhoneViewVintageController',
    }).


    when('/iphone/viewReadyToDrink/home', {
        templateUrl: 'views/desktop/gridReadyToDrink/viewReadyToDrink.html',
        controller: 'iPhoneViewReadyToDrinkVintageController',
    }).
    when('/iphone/viewReadyToDrink/viewVarietal', {
        templateUrl: 'views/iPhone/gridViewVarietalVintage/viewVarietal.html',
        controller: 'iPhoneViewReadyToDrinkVarietalController',
    }).
    



    when('/iphone/viewBottles', {
        templateUrl: 'views/iPhone/gridViewProducerVarietal/viewProducer.html',
        controller: 'iPhoneViewBottleController',
    }).
    when('/iphone/viewProducerVarietal/home', {
        templateUrl: 'views/iPhone/gridViewProducerVarietal/viewProducer.html',
        controller: 'iPhoneViewProducerController',
    }).
    when('/iphone/viewMissingDrinkByDate/home', {
        templateUrl: 'views/iPhone/gridViewProducerVarietal/viewProducer.html',
        controller: 'iPhoneViewProducerController',
    }).
    when('/iphone/viewProducerVarietal/viewVarietal', {
        templateUrl: 'views/iPhone/gridViewProducerVarietal/viewProducer.html',
        controller: 'iPhoneViewProducerVarietalController',
    }).
    when('/iphone/viewProducerVarietal/viewBottles', {
        templateUrl: 'views/iPhone/gridViewProducerVarietal/viewProducer.html',
        controller: 'iPhoneViewProducerBottleController',
    }).
    otherwise({
        redirectTo: '/home'
    });


}]).run(function($rootScope, $location, Data,$templateCache) {

    Data.setDeviceType(navigator.userAgent);
    Data.setGridHeight();

    $templateCache.put('ui-grid/ui-grid-no-header',"<div></div>");
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        // the back button eventually will take us here without changing the viewName correctly
        if (next.templateUrl == "views/home.html"){
            Data.setViewName(txtSideMenu.brandName);
        }
        // thre is nothing special that we need to do here for this application

        //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
          //bind in induvidual controllers.
//TODO track what to do if the user presses BACK
          // $rootScope.$on('$locationChangeSuccess', function($location) {
          //   debugger;
               // $rootScope.actualLocation = $location.path();
           // });
          //
          // $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
          //      if($rootScope.actualLocation === newLocation) {
          //          alert('Why did you use history back?');
          //      }
          //  });

//or or this

// $rootScope.$on('$locationChangeSuccess', function() {
//     $rootScope.actualLocation = $location.path();
// });
//
//
// $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
//
//     //true only for onPopState
//     if($rootScope.actualLocation === newLocation) {
//
//         var back,
//             historyState = $window.history.state;
//
//         back = !!(historyState && historyState.position <= $rootScope.stackPosition);
//
//         if (back) {
//             //back button
//             $rootScope.stackPosition--;
//         } else {
//             //forward button
//             $rootScope.stackPosition++;
//         }
//
//     } else {
//         //normal-way change of page (via link click)
//
//         if ($route.current) {
//
//             $window.history.replaceState({
//                 position: $rootScope.stackPosition
//             });
//
//             $rootScope.stackPosition++;
//
//         }
//
//     }
//
//  });





    });
});
