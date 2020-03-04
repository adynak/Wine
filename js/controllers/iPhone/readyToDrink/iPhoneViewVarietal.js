wineInventory.controller('iPhoneViewReadyToDrinkVarietalController',
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
        var bottles = Data.getIphoneReadyToDrinkVarietals();

        var viewName = bottles[0].EndConsume + " " + txtCommon.viewNameVarietalIphone;

        var endConsumeVarietalCounts = Data.countEndConsumeVaritals(bottles);
        Data.setViewName(viewName,endConsumeVarietalCounts.length);                

        var gridData  = bottles;

        gridData.forEach(function(bottle) {
            bottle.Varietal = he.decode(bottle.Varietal);
        });

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
                field: 'Varietal',
                headerCellClass: 'center',
                // displayName: $scope.prompts.columnVintage,
                displayName: Data.getViewName(),
                cellTemplate: 'views/iPhone/gridReadyToDrink/varietalColumn.html',
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

        function countFilteredBottles(filteredData){
          var varietalVintageCount = 0;
          filteredData.forEach(function(element){
            varietalVintageCount += element.LocationAsArray.length;
          });
          return varietalVintageCount;
        }

        $scope.toggleRow = function(grid,row,colField){
            var rowID = Object.keys(row.entity)[0];
            var filteredData =  _.filter(grid.options.data, { 'Varietal': row.entity[rowID].groupVal});
            Data.setIphoneBottleList(filteredData);
            var viewName = filteredData[0].Vintage + " " + filteredData[0].Varietal + " (" + countFilteredBottles(filteredData) + ")";
            Data.setViewName(viewName);
            $location.path("/iphone/viewBottles");            
        };

        $scope.getCounts = function(fieldName,pattern){
            var obj,searchFor;
            searchFor = pattern["0"].row.entity.EndConsumeVarietal;
            obj = endConsumeVarietalCounts.find(o => o.name === searchFor);
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
