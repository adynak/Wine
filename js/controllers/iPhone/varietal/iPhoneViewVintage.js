wineDetective.controller('iPhoneViewVintageController',
    [
        '$scope',
        '$rootScope',
        'modalService',
        '$location',
        'Data',
        '$filter',
        'AsOfDate',
        'uiGridGroupingConstants',

    function($scope, $rootScope, modalService, $location, Data, $filter, AsOfDate) {

        $scope.prompts = txtCommon;

        var row, done;
        var spreadsheet = Data.getExcel();
        var excelData = spreadsheet.sheets[0];
        var bottles = Data.getIphoneVarietals();
        var viewName = he.decode(bottles[0].Varietal) + " " + txtCommon.viewNameVintageIphone;
        Data.setViewName(viewName,bottles.length);

        var varietalCounts = Data.countVarietals(bottles);
        var varietalVintageCounts = Data.countVaritalVintages(bottles);

        bottles = Data.removeDuplicateRows(bottles);
        bottles = bottles.filter(filterDuplicate);

        var gridData  = bottles;

        // $scope.searchGrid = function() {
        //     $scope.gridOptions.data = $filter('filter')(excelData.gridData , $scope.searchText, undefined);
        // };

        $scope.gridHeight = Data.getGridHeight().gridHeight;
        
        $scope.gridOptions = {
            showHeader: false,
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
                field: 'Vintage',
                headerCellClass: 'center',
                // displayName: $scope.prompts.columnVintage,
                displayName: Data.getViewName(),
                cellTemplate: 'views/iPhone/gridViewVarietalVintage/vintageColumn.html',
                width: "100%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                    groupPriority: 0
                },
                visible: true
              }
            ],
            onRegisterApi: function( gridApi) {
                $rootScope.$on('orientationchange', function () {
                    Data.setGridHeight(window.screen);
                    $scope.gridHeight = Data.getGridHeight().gridHeight;
                })
            }            
        };

        function filterDuplicate(bottle) {
          return bottle.isDuplicate == false;
        };

        function countFilteredBottles(filteredData){
          var varietalVintageCount = 0;
          filteredData.forEach(function(element){
            varietalVintageCount += element.LocationAsArray.length;
          });
          return varietalVintageCount;
        }

        $scope.toggleRow = function(grid,row,colField){
            var rowID = Object.keys(row.entity)[0];
            var filteredData =  _.filter(grid.options.data, { 'Vintage': row.entity[rowID].groupVal});

            Data.setIphoneBottleList(filteredData);
            var viewName = filteredData[0].Vintage + " " + he.decode(filteredData[0].Varietal) + " (" + countFilteredBottles(filteredData) + ")";
            Data.setViewName(viewName);
            $location.path("/iphone/viewBottles");            

        };

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
        };

    }
]);
