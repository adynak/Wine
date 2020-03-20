wineDetective.controller('iPhoneViewReconcileBinsController',
    [
        '$scope',
        '$rootScope',
        '$uibModal',
        '$location',
        'Data',
        '$window',
        '$routeParams',
        '$filter',
        'AsOfDate',
        'uiGridGroupingConstants',

    function($scope, $rootScope, $uibModal, $location, Data, $window, $routeParams, $filter, AsOfDate) {

        $scope.prompts = txtCommon;

        var gridData  = Data.getIphoneReconcileBins();
        var locationName = gridData[0].Location;
        Data.setViewName(txtCommon.columnLocation + ": " + locationName);

        gridData.forEach(function(bottle) {
          bottle.Wine = he.decode(bottle.Wine);
        });

// sort them for this view
        // gridData.sort(function(wine1, wine2) {
        //     if (wine1.Location > wine2.Location) return 1;
        //     if (wine1.Location < wine2.Location) return -1;

        //     if (wine1.Bin < wine2.Bin) return -1;
        //     if (wine1.Bin > wine2.Bin) return 1;
        // });

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
                field: 'Bin',
                displayName: $scope.prompts.columnBins,
                width: "100%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                    groupPriority: 1
                },
                cellTemplate: 'views/desktop/gridReconcileInventory/hideGridDetailRowTemplate.html',
                headerCellClass: 'header-center'
              }
            ],
            onRegisterApi: function( gridApi ) {
              $scope.gridApi = gridApi;
              $scope.gridApi.selection.on.rowSelectionChanged($scope,rowSelectCallbck);
              $scope.gridApi.selection.on.rowFocusChanged($scope,selectChildren);
              $rootScope.$on('orientationchange', function () {
                Data.setGridHeight(window.screen);
                $scope.gridHeight = Data.getGridHeight().reconcileHeight;
                debugger;
              });
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
          var filteredData =  _.filter(grid.options.data, { 'Bin': row.entity[rowID].groupVal});
          Data.setIphoneReconcileBottles(filteredData);
          $location.path("/iPhone/viewReconcile/bottles");
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
