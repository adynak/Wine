wineInventory.controller('iPhoneViewReadyToDrinkVintageController',
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

        bottles = Data.removeDuplicateRows(bottles);
        bottles = bottles.filter(filterDuplicate);

        var gridData  = bottles;

        // $scope.searchGrid = function() {
        //     $scope.gridOptions.data = $filter('filter')(excelData.gridData , $scope.searchText, undefined);
        // };

        $scope.gridHeight = Data.getGridHeight();
        
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
                field: 'EndConsume',
                headerCellClass: 'center',
                // displayName: $scope.prompts.columnVintage,
                displayName: Data.getViewName(),
                cellTemplate: 'views/iPhone/gridReadyToDrink/endConsumeColumn.html',
                width: "100%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                    groupPriority: 0
                },
                visible: true
              }
            ]
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
            var filteredData =  _.filter(grid.options.data, { 'EndConsume': row.entity[rowID].groupVal});
            Data.setIphoneReadyToDrinkVarietals(filteredData);
            var viewName = filteredData[0].EndConsume + " (" + countFilteredBottles(filteredData) + ")";
            Data.setViewName(viewName);
            $location.path("/iphone/viewReadyToDrink/viewVarietal");

        };

        $scope.getCounts = function(fieldName,pattern){
            var obj = readyToDrinkCounts.find(o => o.readyToDrink === pattern);
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
