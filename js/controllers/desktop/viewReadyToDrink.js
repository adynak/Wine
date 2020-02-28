wineInventory.controller('DesktopViewReadyToDrinkController',
    [
        '$scope',
        'modalService',
        '$location',
        'Data',
        '$filter',
        'AsOfDate',
        'uiGridGroupingConstants',

    function($scope, modalService, $location, Data, $filter, AsOfDate) {

        $scope.prompts = txtCommon;

        var row, done;
        var spreadsheet = Data.getExcel();
        AsOfDate.setAsOfDate(spreadsheet.dateStamp);

        var excelData = spreadsheet.sheets[0];

        var bottles = excelData.gridData;
        Data.setViewName(txtCommon.viewNameReadyToDrink,bottles.length);


// sort them for this view
        bottles.sort(function(wine1, wine2) {
            if (wine1.EndConsume > wine2.EndConsume) return 1;
            if (wine1.EndConsume < wine2.EndConsume) return -1;

            if (wine1.Varietal < wine2.Varietal) return -1;
            if (wine1.Varietal > wine2.Varietal) return 1;

            if (wine1.Wine < wine2.Wine) return -1;
            if (wine1.Wine > wine2.Wine) return 1;

        });

        var readyToDrinkCounts = Data.countReadyToDrink(bottles);

        var varietalVintageCounts = Data.countVaritalVintages(bottles);

        bottles = Data.removeDuplicateRows(bottles);
        bottles = bottles.filter(filterDuplicate);

        var gridData  = bottles;

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
            groupingShowCounts: false,
            treeRowHeaderAlwaysVisible: false,
            showTreeRowHeader: false,
            data: gridData,
            // showGridFooter: true,
            columnDefs:
            [
              {
                field: 'EndConsume',
                displayName: $scope.prompts.columnReadyToDrink,
                cellTemplate: 'views/desktop/gridReadyToDrink/endConsumeColumn.html',
                width: "25%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                  groupPriority: 0
                }
              },
              {
                field: 'Varietal',
                displayName: $scope.prompts.columnVarietal,
                cellTemplate: 'views/desktop/gridReadyToDrink/varietalColumn.html',
                width: "10%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                    groupPriority: 1
                }
              },
              {
                field: 'Wine',
                displayName: $scope.prompts.columnBottles,
                cellTemplate: "views/desktop/gridVarietalVintage/bottleColumn.html",
                enableCellEdit: false,
                enableColumnMenu: false,
              },
              {
                field: "LocationAsArray",
                displayName: $scope.prompts.columnInStock,
                enableColumnMenu: false,
                // cellTemplate: 'views/inStockTemplate.html',
                headerCellClass: 'text-center',
                visible: false
              }
            ],
            onRegisterApi: function( gridApi ) {
              $scope.gridApi = gridApi;
              $scope.gridApi.selection.on.rowSelectionChanged($scope, rowSelectCallbck);
              $scope.gridApi.selection.on.rowFocusChanged($scope, selectChildren);
            }
        };

        function selectChildren(row,col){
          var bottles;
          if (row.treeNode.parentRow == null){

          } else {
            bottles = $scope.gridApi.treeBase.getRowChildren(row);
            bottles.forEach(function(bottle) {
              bottle.entity.inStock = !bottle.entity.inStock;
            });

          }
        };

        function rowSelectCallbck(row,col) {
          // clicking the checkbox first toggles the checkbox then calls this callback
          // the checkbox column does not have outerText
          // so the toggle only gets called once
          if (col.currentTarget.outerText.length){
            row.entity.inStock = !row.entity.inStock;
          }

        };

        function filterDuplicate(bottle) {
          return bottle.isDuplicate == false;
        };

        $scope.toggleRow = function(grid,row){
            if (row.treeNode.state == "collapsed"){
                grid.api.treeBase.expandRow(row);
            } else {
                grid.api.treeBase.collapseRow(row);
            }
        };

        $scope.getCounts = function(fieldName,pattern){
            var obj,searchFor;
            switch (fieldName) {
                case "readyToDrink" :
                    obj = readyToDrinkCounts.find(o => o.readyToDrink === pattern);
                    break;
                case "varietal" :
                    obj = varietalCounts.find(o => o.varietal === pattern);
                    break;
                case "vintage" :
                    searchFor = pattern["0"].row.entity.Varietal + pattern["0"].row.entity.Vintage;
                    obj = varietalVintageCounts.find(o => o.name === searchFor);

            }
            return "(" + obj.count + ")";
        };

        $scope.btnDone = function() {
          $scope.prompts.menuOpenFile = txtSideMenu.alwaysMenuOpenFile;
          Data.setViewName(txtSideMenu.brandName);
          $scope.actions = "";
          $location.path("/home");
        };

        $scope.showMeTheBottles = function(row) {
            modalService.showMeTheBottles(row);
        };

    }
]);
