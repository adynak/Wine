wineInventory.controller('ViewInventoryController', 
    [
        '$scope', 
        '$uibModal', 
        '$location',
        'Data', 
        '$window', 
        '$routeParams',
        '$filter',
        'AsOfDate',
        'uiGridGroupingConstants',

    function($scope, $uibModal, $location, Data, $window, $routeParams, $filter, AsOfDate) {


        $scope.prompts = txtCommon;

        var spreadsheet = Data.getExcel();
        AsOfDate.setAsOfDate(spreadsheet.dateStamp);


        var excelData = spreadsheet.sheets[0];
        
        var gridData  = excelData.gridData;

        $scope.sheetName = excelData.sheetName;

        $scope.btnDone = function() {
          var missingBottles = Array();
          for (i = 0; i < $scope.gridOptions.data.length; i++)
          {
                  if ($scope.gridOptions.data[i].inStock == false)
                  {
                      var temp = new Object();
                      temp.location = $scope.gridOptions.data[i].Location;
                      temp.bin = $scope.gridOptions.data[i].Bin;
                      temp.bottle = $scope.gridOptions.data[i].Wine;
                      temp.barcode = $scope.gridOptions.data[i].Barcode;
                      missingBottles.push(temp);
                  }
          }
          if (missingBottles.length > 0){
              Data.setMissingBottles(missingBottles);
          }

          $location.path("/viewMissingInventory");

        }

        $scope.searchGrid = function() {
            $scope.gridOptions.data = $filter('filter')(excelData.gridData , $scope.searchText, undefined);
        };

        $scope.gridOptions = {
            enableGridMenu: false,
            enableSorting : false,
            enableRowSelection: true,
            enableRowHeaderSelection: false, 
            enableColumnMenus: false,
            multiSelect: false,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            data: gridData,
            // showGridFooter: true,
            columnDefs: 
            [
              {
                field: 'Location',
                displayName: $scope.prompts.columnLocation,
                width: "15%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                  groupPriority: 0
                },
                cellTemplate: 'views/hideGridDetailRowTemplate.html'
              },
              {
                field: 'Bin',
                displayName: $scope.prompts.columnBins,
                width: "15%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                    groupPriority: 1
                },
                cellTemplate: 'views/hideGridDetailRowTemplate.html'                
              },
              {
                field: 'Wine',
                displayName: $scope.prompts.columnBottles,
                cellTemplate: '<span>{{row.entity.Vintage}} {{row.entity.Wine}}</span>',
                width: "50%",
                enableCellEdit: false,
                enableColumnMenu: false,
              },
              {
                field: "inStock",
                displayName: $scope.prompts.columnInStock,
                enableColumnMenu: false,
                cellTemplate: 'views/inStockTemplate.html',
                headerCellClass: 'text-center'
              }
            ],
            onRegisterApi: function( gridApi ) { 
              $scope.gridApi = gridApi; 
              $scope.gridApi.selection.on.rowSelectionChanged($scope,rowSelectCallbck);
            }            
        };

        function rowSelectCallbck(row,col,$event) { 
          // clicking the checkbox first toggles the checkbox then calls this callback
          // the checkbox column does not have outerText
          // so the toggle only gets called once
          if (col.currentTarget.outerText.length){
            row.entity.inStock = !row.entity.inStock;
          }

        };

    }
]);
