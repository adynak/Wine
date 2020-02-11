wineInventory.controller('HomeController', 
    [
        '$scope', 
        '$http', 
        '$location', 
        'Data', 
        '$rootScope', 
        '$routeParams', 
        'AsOfDate',

    function($scope, $http, $location, Data, $rootScope, $routeParams, AsOfDate) {

        $scope.prompts = txtSideMenu;
        var spreadsheet;
        $scope.applyThisClass = function(memberProfile) {
            return "";
            if (typeof(memberProfile) !== 'undefined'){
                if (memberProfile.member_type) {
                    return "";
                } else {
                    return "sr-only";
                }
            }
        }

        $scope.menuShowFilename = function() {
            var spreadsheet = Data.getExcel();

            var showFilename = false;
            if (typeof(spreadsheet.filename) != 'undefined'){
                $scope.excelFilename = spreadsheet.filename;
                // $scope.prompts.menuOpenFile = spreadsheet.dateStamp;
                $scope.actions    = txtSideMenu.menuChooseAction;
                showFilename = true;
            }
            return showFilename;
        }

        $scope.runAction = function(action){
            switch(action){
                case "viewVarietal" :
                    $location.path("/viewVarietal");
                    break;

                case "viewProducer" :
                    $location.path("/viewProducer");
                    break;

               case "viewReconcile" :
                    $location.path("/viewReconcile");
                    break;

                case "startOver" :
                    var resetExcel = {
                        sheetName: null,
                        columnDefs: null,
                        gridData: null
                    };
                    $scope.prompts.menuOpenFile = txtSideMenu.alwaysMenuOpenFile;
                    Data.setExcel(resetExcel);
                    Data.setViewName(txtSideMenu.brandName);
                    AsOfDate.setAsOfDate("");
                    $scope.actions = "";
                    $location.path("/home");
                    break;

            }
        };

    }

]);