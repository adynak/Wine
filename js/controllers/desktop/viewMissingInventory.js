wineInventory.controller('DesktopViewMissingInventoryController',
    [
        '$scope',
        '$location',
        'Data',
        '$rootScope',
        '$routeParams',
        'modalService',

        function($scope, $location, Data, $rootScope, $routeParams, modalService) {

            $scope.prompts = txtCommon;

            var missingBottles = Data.getMissingBottles();

            if ((missingBottles.length) > 0) {
                missingBottles.forEach(function(arrayItem) {
                    arrayItem.url = txtCommon.cellartrackerURL + arrayItem.barcode;
                });
            } else {
                var nothingHere = {
                    location: "All",
                    bin: "All",
                    bottle: "There are no missing bottles"
                };
                missingBottles.push(nothingHere);
            }
            
            $scope.gridHeight = Data.getGridHeight();            

            $scope.gridMissingBottles = {
                enableGridMenu: false,
                enableSorting: false,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                exporterMenuPdf: false,
                exporterMenuCsv: false,
                treeRowHeaderAlwaysVisible: false,
                showTreeRowHeader: false,
                data: missingBottles,
                columnDefs: [
                    // {
                    //     name: 'Location',
                    //     field: 'location',
                    //     width: "15%",
                    //     enableCellEdit: false,
                    //     enableColumnMenu: false,
                    //     grouping: {
                    //         groupPriority: 0
                    //     },
                    //     cellTemplate: 'views/desktop/gridMissingInventory/hideGridDetailRowTemplate.html'
                    // },
                    // {
                    //     name: 'Bins',
                    //     field: 'bin',
                    //     width: "15%",
                    //     enableCellEdit: false,
                    //     enableColumnMenu: false,
                    //     grouping: {
                    //         groupPriority: 1
                    //     },
                    //     cellTemplate: 'views/desktop/gridMissingInventory/hideGridDetailRowTemplate.html'
                    // },
                    {
                        name: 'Bottles',
                        field: 'bottle',
                        enableCellEdit: false,
                        enableColumnMenu: false,
                        cellTemplate: 'views/desktop/gridMissingInventory/fixMissingInventoryTemplate.html'
                    }
                ]
            };

            $scope.startOver = function() {

                modalService.startOver();

                // $uibModal.open({
                //     templateUrl: 'views/modal.html',
                //     controller: function($scope, $uibModalInstance) {
                //         $scope.prompts = txtModal;

                //         $scope.ok = function() {
                //             var resetExcel = {
                //                 sheetName: null,
                //                 columnDefs: null,
                //                 gridData: null
                //             };
                //             Data.setExcel(resetExcel);
                //             $uibModalInstance.close();
                //             $location.path("/home");
                //         };

                //         $scope.cancel = function() {
                //             $uibModalInstance.close();
                //             $location.path("/home");
                //         };
                //     }

                // });

            };

        }
    ]);
