wineInventory.controller('iPhoneViewProducerBottleController',
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
        var bottles = Data.getIphoneBottleList();
        var viewName = bottles[0].Producer + " " + bottles[0].Varietal;
        Data.setViewName(viewName,bottles.length);

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
                field: 'WineName',
                headerCellClass: 'center',
                displayName: Data.getViewName(),
                cellTemplate: "views/iPhone/gridViewVarietalVintage/bottleColumn.html",
                enableCellEdit: false,
                enableColumnMenu: false,
                visible: true
              }
            ]
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