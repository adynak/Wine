wineInventory.controller('NavigationController',
    [
        '$scope',
        'Data',
        'AsOfDate',
        'modalService',
        function($scope, Data, AsOfDate, modalService) {

            $scope.prompts = txtNavigation;

            Data.setViewName(txtNavigation.brandName);
            $scope.AsOfDate = AsOfDate;
            $scope.Data = Data;

            $scope.startOver = function() {
                modalService.startOver();
            };
        }
    ]);