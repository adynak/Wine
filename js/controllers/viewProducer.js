wineInventory.controller('ViewProducerController', 
    [
        '$scope', 
        '$uibModal', 
        '$location',
        'Data', 
        '$window', 
        '$routeParams',
        '$filter',
        'AsOfDate',
        'uiGridGroupingConstants',

    function($scope, $uibModal, $location, Data, $window, $routeParams, $filter, AsOfDate) {

        $scope.prompts = txtCommon;

        var spreadsheet = Data.getExcel();
        AsOfDate.setAsOfDate(spreadsheet.dateStamp);
        Data.setViewName(txtCommon.viewNameProducer);


        // var excelData = spreadsheet.sheets[0];
        
        // var gridData  = excelData.gridData;

        // $scope.sheetName = excelData.sheetName;

        $scope.btnDone = function() {
          $scope.prompts.menuOpenFile = txtSideMenu.alwaysMenuOpenFile;
          Data.setViewName(txtSideMenu.brandName);
          $scope.actions = "";
          $location.path("/home");
        }

        // $scope.searchGrid = function() {
        //     $scope.gridOptions.data = $filter('filter')(excelData.gridData , $scope.searchText, undefined);
        // };


$scope.gridOptions = {};
        // $scope.gridOptions = {
        //     enableGridMenu: false,
        //     enableSorting : false,
        //     enableRowSelection: true,
        //     enableRowHeaderSelection: false,
        //     enableColumnMenus: false,
        //     multiSelect: false,
        //     exporterMenuPdf: false,
        //     exporterMenuCsv: false,
        //     showGridFooter: false,
        //     gridFooterTemplate: 'views/viewReconcileFooter.html',
        //     data: gridData,
        //     // showGridFooter: true,
        //     columnDefs: 
        //     [
        //       {
        //         field: 'Location',
        //         displayName: $scope.prompts.columnLocation,
        //         width: "15%",
        //         enableCellEdit: false,
        //         enableColumnMenu: false,
        //         grouping: {
        //           groupPriority: 0
        //         },
        //         cellTemplate: 'views/hideGridDetailRowTemplate.html'
        //       },
        //       {
        //         field: 'Bin',
        //         displayName: $scope.prompts.columnBins,
        //         width: "15%",
        //         enableCellEdit: false,
        //         enableColumnMenu: false,
        //         grouping: {
        //             groupPriority: 1
        //         },
        //         cellTemplate: 'views/hideGridDetailRowTemplate.html'                
        //       },
        //       {
        //         field: 'Wine',
        //         displayName: $scope.prompts.columnBottles,
        //         cellTemplate: '<span>{{row.entity.Vintage}} {{row.entity.Wine}}</span>',
        //         width: "50%",
        //         enableCellEdit: false,
        //         enableColumnMenu: false,
        //       },
        //       {
        //         field: "inStock",
        //         displayName: $scope.prompts.columnInStock,
        //         enableColumnMenu: false,
        //         cellTemplate: 'views/inStockTemplate.html',
        //         headerCellClass: 'text-center'
        //       }
        //     ],
        //     onRegisterApi: function( gridApi ) { 
        //       $scope.gridApi = gridApi;
        //       $scope.gridApi.selection.on.rowSelectionChanged($scope,rowSelectCallbck);
        //       $scope.gridApi.selection.on.rowFocusChanged($scope,selectChildren);
        //     }            
        // };

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