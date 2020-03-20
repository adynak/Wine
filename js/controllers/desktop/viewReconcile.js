wineDetective.controller('DesktopViewReconcileController',
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
        Data.setViewName(txtCommon.viewNameReconcileInventory);


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

        $scope.gridHeight = Data.getGridHeight().reconcileHeight;
        debugger;


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
                displayName: $scope.prompts.columnLocation,
                width: "15%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                  groupPriority: 0
                },
                cellTemplate: 'views/desktop/gridReconcileInventory/hideGridDetailRowTemplate.html'
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
                cellTemplate: 'views/desktop/gridReconcileInventory/hideGridDetailRowTemplate.html'
              },
              {
                field: 'Wine',
                displayName: $scope.prompts.columnBottles,
                cellTemplate: 'views/desktop/gridReconcileInventory/bottleColumn.html',
                width: "50%",
                enableCellEdit: false,
                enableColumnMenu: false,
              },
              {
                field: "inStock",
                displayName: $scope.prompts.columnInStock,
                enableColumnMenu: false,
                cellTemplate: 'views/desktop/gridReconcileInventory/inStockTemplate.html',
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
            if (row.treeNode.state == "collapsed"){
                grid.api.treeBase.expandRow(row);
            } else {
                grid.api.treeBase.collapseRow(row);
            }
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
