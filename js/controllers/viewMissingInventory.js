wineInventory.controller('ViewMissingInventoryController', 
  [
    '$scope', 
    '$http', 
    '$location', 
    'Data', 
    '$rootScope', 
    '$routeParams', 

    function($scope, $http, $location, Data, $rootScope, $routeParams) {

        $scope.prompts = txtCommon;

        var missingBottles = Data.getMissingBottles();

        if ((missingBottles.length) > 0){
            missingBottles.forEach(function (arrayItem) {
                arrayItem.url = txtCommon.cellartrackerURL + arrayItem.barcode;
            });
        } else {
            var nothingHere = {
                location: "All",
                bin: "All",
                bottle: "There are no missing bottles"};
            missingBottles.push(nothingHere);
        }

        $scope.gridMissingBottles = {
            enableGridMenu: false,
            enableSorting : false,
            enableRowSelection: true,
            enableRowHeaderSelection: false, 
            multiSelect: false,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            data: missingBottles,
            columnDefs: 
            [
              {
                name: 'Location',
                field: 'location',
                width: "15%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                  groupPriority: 0
                },
                cellTemplate: 'views/hideGridDetailRowTemplate.html'
              },
              {
                name: 'Bins',
                field: 'bin',
                width: "15%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                    groupPriority: 1
                },
                cellTemplate: 'views/hideGridDetailRowTemplate.html'                
              },
              {
                name: 'Bottles',
                field: 'bottle',
                enableCellEdit: false,
                enableColumnMenu: false,
                cellTemplate: 'views/fixMissingInventoryTemplate.html'                
              }            
            ]
        };

        $scope.startOver = function() {
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