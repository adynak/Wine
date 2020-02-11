wineInventory.controller('NavigationController',
    [
        '$scope',
        '$http',
        '$location',
        'Data',
        '$rootScope',
        '$routeParams',
        'AsOfDate',
        '$uibModal',
        function($scope, $http, $location, Data, $rootScope, $routeParams, AsOfDate, $uibModal) {

            $scope.prompts = txtNavigation;

            Data.setViewName(txtNavigation.brandName);
            $scope.AsOfDate = AsOfDate;
            $scope.Data = Data;

            $scope.startOver = function() {

                $uibModal.open({
                    templateUrl: 'views/modal.html',
                    controller: function($scope, $uibModalInstance) {
                        $scope.prompts = txtModal;

                        $scope.ok = function() {
                            var resetExcel = {
                                sheetName: null,
                                columnDefs: null,
                                gridData: null
                            };
                            Data.setExcel(resetExcel);
                            $uibModalInstance.close();
                            $location.path("/home");
                        };

                        $scope.cancel = function() {
                            $uibModalInstance.close();
                            $location.path("/home");
                        };
                    }

                });

            };
        }
    ]);