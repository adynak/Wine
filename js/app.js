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

        //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
          //bind in induvidual controllers.
//TODO track what to do if the user presses BACK
          // $rootScope.$on('$locationChangeSuccess', function() {
          //      $rootScope.actualLocation = $location.path();
          //  });
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
