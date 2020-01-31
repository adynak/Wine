wineInventory.controller('NavigationController', 
	[
		'$scope', 
		'$http', 
		'$location', 
		'Data', 
		'$rootScope', 
		'$routeParams', 

    function($scope, $http, $location, Data, $rootScope, $routeParams) {

		$scope.prompts = txtNavigation;

		$scope.startOver = function() {
// TODO how about an "are you sure" dialog here?			
			var resetExcel = {
                sheetName: null,
                columnDefs: null,
                gridData: null
            };
			Data.setExcel(resetExcel);
			$location.path("/home");
		};
    }
]);