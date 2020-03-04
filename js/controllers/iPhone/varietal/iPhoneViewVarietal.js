wineInventory.controller('iPhoneViewVarietalController',
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
        // AsOfDate.setAsOfDate(spreadsheet.dateStamp);

        var excelData = spreadsheet.sheets[0];

        var bottles = excelData.gridData;
        var varietalCounts = Data.countVarietals(bottles);
        Data.setViewName(txtCommon.viewNameVarietalIphone,varietalCounts.length);

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
            headerRowHeight: 0,
            // showGridFooter: true,
            columnDefs:
            [
              {
                field: 'Varietal',
                headerCellTemplate: '<div></div>',
                // displayName: Data.getViewName(),
                cellTemplate: 'views/iPhone/gridViewVarietalVintage/varietalColumn.html',
                width: "100%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                  groupPriority: 0
                }
              }
            ]
        };

        function filterDuplicate(bottle) {
          return bottle.isDuplicate == false;
        };

        $scope.toggleRow = function(grid,row){
            var rowID = Object.keys(row.entity)[0];
            var filteredData =  _.filter(excelData.gridData, { 'Varietal': row.entity[rowID].groupVal});
            Data.setIphoneVarietals(filteredData);
            Data.setViewName(he.decode(row.entity[rowID].groupVal));
            $location.path("/iphone/viewVarietalVintage/viewVintage");

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
        };

    }
]);
