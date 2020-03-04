wineInventory.controller('iPhoneViewProducerController',
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

        var row, done,wineType;
        var spreadsheet = Data.getExcel();
        // AsOfDate.setAsOfDate(spreadsheet.dateStamp);

        var excelData = spreadsheet.sheets[0];

        var bottles = excelData.gridData;

        if ($location.path().search("viewMissingDrinkByDate") >= 0){
          bottles =  _.filter(bottles, { 'EndConsume': "unknown"});
          Data.setViewName(txtCommon.viewNameMissingDrinkByDate,bottles.length); 
          bottles.sort(function(wine1, wine2) {
            if (wine1.Producer > wine2.Producer) return 1;
            if (wine1.Producer < wine2.Producer) return -1;
            
            if (wine1.Vintage < wine2.Vintage) return -1;
            if (wine1.Vintage > wine2.Vintage) return 1;
          });          
        } else {
          Data.setViewName(txtCommon.viewNameProducer,bottles.length);
          bottles.sort(function(wine1, wine2) {
            if (wine1.Producer > wine2.Producer) return 1;
            if (wine1.Producer < wine2.Producer) return -1;

            if (wine1.Varietal < wine2.Varietal) return -1;
            if (wine1.Varietal > wine2.Varietal) return 1;

            if (wine1.Vintage < wine2.Vintage) return -1;
            if (wine1.Vintage > wine2.Vintage) return 1;
          });

        }

        var producerCounts = Data.countProducers(bottles);
        Data.setViewName(txtCommon.viewNameProducerIphone,producerCounts.length);        
// sort them for this view

        var producerVarietalCounts = Data.countProducerVaritals(bottles);

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
                field: 'Producer',
                headerCellTemplate: '<div></div>',
                displayName: $scope.prompts.columnProducer,
                cellTemplate: 'views/iPhone/gridViewProducerVarietal/producerColumn.html',
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
        }

        $scope.toggleRow = function(grid,row){

            var rowID = Object.keys(row.entity)[0];
            Data.setViewName(row.entity[rowID].groupVal);

            if ($location.path().search("viewMissingDrinkByDate") >= 0){
                var filteredData =  _.filter(grid.options.data, { 'Producer': row.entity[rowID].groupVal});
                Data.setIphoneBottleList(filteredData);
                $location.path("/iphone/viewProducerVarietal/viewBottles?fixMissingBottle");
            } else {
                var filteredData =  _.filter(excelData.gridData, { 'Producer': row.entity[rowID].groupVal});
                Data.setIphoneProducers(filteredData);
                $location.path("/iphone/viewProducerVarietal/viewVarietal");
            }
           
        }

        $scope.getCounts = function(fieldName,pattern){
            var obj,searchFor;
            switch (fieldName) {
                case "producer" :
                  obj = producerCounts.find(o => o.producer === pattern);
                  break;
                case "varietal" :
                    searchFor = pattern["0"].row.entity.Producer + pattern["0"].row.entity.Varietal;
                    obj = producerVarietalCounts.find(o => o.name === searchFor);
                    break;
            }
            return "(" + obj.count + ")";
        }

        $scope.btnDone = function() {
          $scope.prompts.menuOpenFile = txtSideMenu.alwaysMenuOpenFile;
          Data.setViewName(txtSideMenu.brandName);
          $scope.actions = "";
          $location.path("/home");
        }

    }
]);
