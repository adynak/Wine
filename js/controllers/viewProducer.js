wineInventory.controller('ViewProducerController',
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

        var row, done,wineType;
        var spreadsheet = Data.getExcel();
        AsOfDate.setAsOfDate(spreadsheet.dateStamp);
        Data.setViewName(txtCommon.viewNameVarietal);

        $scope.showMeTheBottles = function(row) {

            var locationBin = Data.locationBin(row);
             
            if (row.entity.Wine.indexOf(row.entity.Varietal) >= 0){
                wineType = "";
            } else {
                wineType = row.entity.Varietal;
            }

            var modalScope = $rootScope.$new();
            modalScope.bottle = {
                    bottleCount: row.entity.Location.length,
                    vintage: row.entity.Vintage,
                    wine: row.entity.Wine,
                    location: locationBin,
                    plurals: txtCommon.plurals,
                    wineType: wineType
                };
            $uibModal.open({
                scope: modalScope,
                templateUrl: 'views/wheresMyWineModal.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.prompts = txtModal;

                    $scope.ok = function() {
                        $uibModalInstance.close();
                    };

                }

            });

        };

        var excelData = spreadsheet.sheets[0];

        var bottles = excelData.gridData;

        var varietalCounts = Data.countVarietals(bottles);

// sort them for this view
        bottles.sort(function(wine1, wine2) {
            if (wine1.Producer > wine2.Producer) return 1;
            if (wine1.Producer < wine2.Producer) return -1;

            if (wine1.Varietal < wine2.Varietal) return -1;
            if (wine1.Varietal > wine2.Varietal) return 1;

            if (wine1.iWine < wine2.iWine) return -1;
            if (wine1.iWine > wine2.iWine) return 1;

        });
// change Location and Bin into arrays
// append concat of varietal and vintage for counting
        bottles.forEach(function(row) {
            row.LocationAsArray = [row.Location];
            row.BinAsArray = [row.Bin];
            row.VarietalVintage = row.Varietal + row.Vintage;
        });

        var vintageCounts = Data.countVintages(bottles);

// remove duplicate rows
        function checkDuplicate(bottle) {
          return bottle.isDuplicate == false;
        }

        for (i=1; i < bottles.length; ++i) {
            if (bottles[i].iWine == bottles[i-1].iWine){
                bottles[i].isDuplicate = true;

// find the previous row that is NOT a duplicate
                row = 0;
                done = false;
                do {
                    row++;
                    if (bottles[i-row].isDuplicate){

                    } else {
                        bottles[i-row].LocationAsArray.push(bottles[i].Location);
                        bottles[i-row].BinAsArray.push(bottles[i].Bin);
                        done = true
                    }
                }
                while (done == false);


            } else {
                bottles[i].isDuplicate = false;
            }
        }

        bottles = bottles.filter(checkDuplicate);

        var gridData  = bottles;

        $scope.btnDone = function() {
          $scope.prompts.menuOpenFile = txtSideMenu.alwaysMenuOpenFile;
          Data.setViewName(txtSideMenu.brandName);
          $scope.actions = "";
          $location.path("/home");
        }

        // $scope.searchGrid = function() {
        //     $scope.gridOptions.data = $filter('filter')(excelData.gridData , $scope.searchText, undefined);
        // };



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
            data: gridData,
            // showGridFooter: true,
            columnDefs:
            [
              {
                field: 'Producer',
                displayName: $scope.prompts.columnProducer,
                width: "20%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                  groupPriority: 0
                },
                cellTemplate: 'views/producerColumn.html'
              },
              {
                field: 'Varietal',
                displayName: $scope.prompts.columnVarietal,
                width: "20%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                    groupPriority: 1
                },
                cellTemplate: 'views/varietalColumn.html'
              },
              {
                field: 'Wine',
                displayName: $scope.prompts.columnBottles,
                // cellTemplate: '<div ng-click="grid.appScope.showMeTheBottles(row)" class="ui-grid-cell-contents">{{row.entity.LocationAsArray.length}} - {{row.entity.Wine}}</div>',
                cellTemplate: "views/bottleColumn.html",
                // width: "50%",
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
              $scope.gridApi.selection.on.rowSelectionChanged($scope,rowSelectCallbck);
              $scope.gridApi.selection.on.rowFocusChanged($scope,selectChildren);
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

        $scope.getCounts = function(fieldName,pattern){
            var obj,searchFor;
            switch (fieldName) {
                case "varietal" :
                    obj = varietalCounts.find(o => o.varietal === pattern);
                    break;
                case "vintage" :
                    searchFor = pattern["0"].row.entity.Varietal + pattern["0"].row.entity.Vintage
                    obj = vintageCounts.find(o => o.vintage === searchFor);

            }
            return "(" + obj.count + ")";
        }

    }
]);
