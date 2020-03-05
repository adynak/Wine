wineDetective.controller('iPhoneViewReconcileController',
    [
        '$scope',
        '$uibModal',
        '$location',
        'Data',
        '$window',
        '$routeParams',
        '$filter',
        'uiGridGroupingConstants',

    function($scope, $uibModal, $location, Data, $window, $routeParams, $filter) {


        $scope.prompts = txtCommon;

        var spreadsheet = Data.getExcel();
        var inventoryDate = moment(spreadsheet.unixDate).format("MM/DD/YYYY h:mm:ss A");
        Data.setViewName(txtCommon.viewNameReconcileInventoryIphone + " " + inventoryDate);


        var excelData = spreadsheet.sheets[0];

        var gridData  = excelData.gridData;

        gridData.forEach(function(bottle) {
          bottle.Wine = he.decode(bottle.Wine);
        });

        $scope.sheetName = excelData.sheetName;

// sort them for this view
        gridData.sort(function(wine1, wine2) {
            if (wine1.Location > wine2.Location) return 1;
            if (wine1.Location < wine2.Location) return -1;

            if (wine1.Bin < wine2.Bin) return -1;
            if (wine1.Bin > wine2.Bin) return 1;
        });

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
                      temp.vintage = $scope.gridOptions.data[i].Vintage;
                      missingBottles.push(temp);
                  }
          }
          if (missingBottles.length > 0){
              Data.setMissingBottles(missingBottles);
          }

          $location.path("/viewMissingInventory");

        }

        // $scope.searchGrid = function() {
        //     $scope.gridOptions.data = $filter('filter')(excelData.gridData , $scope.searchText, undefined);
        // };

        $scope.gridHeight = Data.getGridHeight();

        $scope.gridOptions = {
            enableGridMenu: false,
            enableSorting : false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableColumnMenus: false,
            multiSelect: false,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            showGridFooter: false,
            gridFooterTemplate: 'views/viewReconcileFooter.html',
            treeRowHeaderAlwaysVisible: false,
            showTreeRowHeader: false,
            data: gridData,
            // showGridFooter: true,
            columnDefs:
            [
              {
                field: 'Location',
                displayName: $scope.prompts.columnLocations,
                width: "100%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                  groupPriority: 0
                },
                cellTemplate: 'views/iPhone/gridReconcileInventory/locationsColumn.html',
                headerCellClass: 'header-center'
              }
            ],
            onRegisterApi: function( gridApi ) {
              $scope.gridApi = gridApi;
              $scope.gridApi.selection.on.rowSelectionChanged($scope,rowSelectCallbck);
              $scope.gridApi.selection.on.rowFocusChanged($scope,selectChildren);
            }
        };

        function selectChildren(row,col){
          var bottles;
          if (row.treeNode.parentRow == null){

          } else {
            if (typeof(col.target.type) == "undefined"){

            } else {
              bottles = $scope.gridApi.treeBase.getRowChildren(row);
              bottles.forEach(function(bottle) {
                bottle.entity.inStock = !bottle.entity.inStock;
              });
            }

          }
        };

        $scope.toggleRow = function(grid,row){
          var rowID = Object.keys(row.entity)[0];
          var filteredData =  _.filter(excelData.gridData, { 'Location': row.entity[rowID].groupVal});
          Data.setIphoneReconcileBins(filteredData);
          $location.path("/iPhone/viewReconcile/bins");
        }        

        function rowSelectCallbck(row,col) {
          // clicking the checkbox first toggles the checkbox then calls this callback
          // the checkbox column does not have outerText
          // so the toggle only gets called once
          if (col.currentTarget.outerText.length){
            row.entity.inStock = !row.entity.inStock;
          }

        };

    }
]);
