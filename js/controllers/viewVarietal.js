wineInventory.controller('ViewVarietalController', 
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

        var row, done;
        var spreadsheet = Data.getExcel();
        AsOfDate.setAsOfDate(spreadsheet.dateStamp);
        Data.setViewName(txtCommon.viewNameVarietal);

        $scope.showMeTheBottles = function(row) {

            var locationBin = Data.locationBin(row);

            var modalScope = $rootScope.$new();
            modalScope.bottle = {
                    bottleCount: row.entity.Location.length,
                    vintage: row.entity.Vintage,
                    wine: row.entity.Wine,
                    location: locationBin,
                    plurals: txtCommon.plurals
                };
            $uibModal.open({
                scope: modalScope,
                templateUrl: 'views/wheresMyWIneModal.html',
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
// sort them for this view
        bottles.sort(function(wine1, wine2) {
            if (wine1.Varietal > wine2.Varietal) return 1;
            if (wine1.Varietal < wine2.Varietal) return -1;

            if (wine1.Vintage < wine2.Vintage) return -1;
            if (wine1.Vintage > wine2.Vintage) return 1;

            if (wine1.iWine < wine2.iWine) return -1;
            if (wine1.iWine > wine2.iWine) return 1;

        });
// change Location and Bin into arrays
        bottles.forEach(function(row) {
            row.Location = [row.Location];
            row.Bin = [row.Bin];
        });

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
                        bottles[i-row].Location.push(bottles[i].Location[0]);
                        bottles[i-row].Bin.push(bottles[i].Bin[0]);
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
                field: 'Varietal',
                displayName: $scope.prompts.columnVarietal,
                width: "25%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                  groupPriority: 0
                },
                cellTemplate: 'views/hideGridDetailRowTemplate.html'
              },
              {
                field: 'Vintage',
                displayName: $scope.prompts.columnVintage,
                width: "15%",
                enableCellEdit: false,
                enableColumnMenu: false,
                grouping: {
                    groupPriority: 1
                },
                cellTemplate: 'views/hideGridDetailRowTemplate.html'                
              },
              {
                field: 'Wine',
                displayName: $scope.prompts.columnBottles,
                    cellTemplate: '<div ng-click="grid.appScope.showMeTheBottles(row)" class="ui-grid-cell-contents">{{row.entity.Wine}}</div>',
                // width: "50%",
                enableCellEdit: false,
                enableColumnMenu: false,
              },
              {
                field: "Location",
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

    }
]);
