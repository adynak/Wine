wineDetective.controller('desktopSearchController',
    [
        '$scope',
        'modalService',
        '$location',
        'Data',
        '$filter',
        'AsOfDate',
        '$routeParams', 
        'uiGridGroupingConstants',

    function($scope, modalService, $location, Data, $filter, AsOfDate, $routeParams) {

        $scope.prompts = txtCommon;
        
        var row, done,searchViewName;
        var spreadsheet = Data.getExcel();
        AsOfDate.setAsOfDate(spreadsheet.dateStamp);

        var excelData = spreadsheet.sheets[0];

        var bottles = excelData.gridData;
        debugger;
        Data.setViewName(txtCommon.viewNameSearch,bottles.length);

        var varietalCounts = Data.countVarietals(bottles);

// sort them for this view
        bottles.sort(function(wine1, wine2) {
            if (wine1.Varietal > wine2.Varietal) return 1;
            if (wine1.Varietal < wine2.Varietal) return -1;

            if (wine1.Vintage < wine2.Vintage) return -1;
            if (wine1.Vintage > wine2.Vintage) return 1;

            if (wine1.Producer < wine2.Producer) return -1;
            if (wine1.Producer > wine2.Producer) return 1;

        });

        var varietalVintageCounts = Data.countVaritalVintages(bottles);

        bottles = Data.removeDuplicateRows(bottles);
        bottles = bottles.filter(filterDuplicate);

        var gridData  = bottles;

        $scope.searchGrid = function() {
            //TODO exclude cat columns from filter
            bottles = $filter('filter')(excelData.gridData , $scope.searchText, undefined);
            debugger;
            if ($scope.searchText.length == 0){
                searchViewName = txtCommon.viewNameSearch;
            } else {
                searchViewName = txtCommon.viewNameSearchFor + ' "' + $scope.searchText + '"';
            }
            Data.setViewName(searchViewName,bottles.length);
            bottles = Data.removeDuplicateRows(bottles);
            bottles = bottles.filter(filterDuplicate);
            $scope.gridOptions.data = bottles;
        };

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
                field: 'Varietal',
                displayName: $scope.prompts.columnVarietal,
                cellTemplate: 'views/desktop/gridViewSearch/genericColumn.html',
                width: "20%",
                enableCellEdit: false,
                enableColumnMenu: false,
              },
              {
                field: 'Vintage',
                displayName: $scope.prompts.columnVintage,
                cellTemplate: 'views/desktop/gridViewSearch/genericColumn.html',
                width: "7%",
                enableCellEdit: false,
                enableColumnMenu: false,
              },
              {
                field: 'Appellation',
                cellTemplate: 'views/desktop/gridViewSearch/genericColumn.html',
                width: "15%",
                enableCellEdit: false,
                enableColumnMenu: false,
                visible: true
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

        $scope.decode = function(str){
            return he.decode(str);
        }

        $scope.getCounts = function(fieldName,pattern){
            var obj,searchFor;
            switch (fieldName) {
                case "varietal" :
                    obj = varietalCounts.find(o => o.varietal === pattern);
                    break;
                case "vintage" :
                    searchFor = pattern["0"].row.entity.Varietal + pattern["0"].row.entity.Vintage
                    obj = varietalVintageCounts.find(o => o.name === searchFor);

            }
            return "(" + obj.count + ")";
        };

        $scope.btnDone = function() {
          $scope.prompts.menuOpenFile = txtSideMenu.alwaysMenuOpenFile;
          Data.setViewName(txtSideMenu.brandName);
          $scope.actions = "";
          $location.path("/home");
          Data.setNavVisibility(true);
        };

        $scope.showMeTheBottles = function(row) {
            modalService.showMeTheBottles(row);
        };

    }
]);
