wineDetective.controller('HomeController', 
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
            var showFilename = false;
            var spreadsheet = Data.getExcel();

            if (typeof(spreadsheet.columnCheck) != 'undefined'){
                if (spreadsheet.columnCheck.length > 0){
                    return showFilename;
                }
            }

            if (typeof(spreadsheet.filename) != 'undefined'){
                $scope.prompts.menuOpenFile = txtSideMenu.chooseReport
                $scope.excelFilename = spreadsheet.filename;
                $scope.actions = txtSideMenu.menuChooseAction;
                showFilename = true;
            } else {
                $scope.prompts.menuOpenFile = txtSideMenu.alwaysMenuOpenFile;
                AsOfDate.setAsOfDate("");

            }
            return showFilename;
        }

        $scope.runAction = function(action){
            var deviceType = Data.getDeviceType();
            switch(action){
                case "viewVarietal" :
                    if(deviceType == "iPhone"){
                        $location.path("/iphone/viewVarietalVintage/home");
                    } else {
                        $location.path("/desktop/viewVarietal");
                    }
                    break;

                case "viewProducer" :
                    if(deviceType == "iPhone"){
                        $location.path("/iphone/viewProducerVarietal/home");
                    } else {
                        $location.path("/desktop/viewProducer");
                    }
                    break;

                case "viewMissingDrinkByDate":
                    if(deviceType == "iPhone"){
                        $location.path("/iphone/viewMissingDrinkByDate/home");
                    } else {
                        $location.path("/desktop/viewMissingDrinkByDate");
                    }
                    break;

               case "viewReconcile" :
                    if(deviceType == "iPhone"){
                        $location.path("/iPhone/viewReconcile/home");
                    } else {
                        $location.path("/viewReconcile");
                    }
                    break;

               case "viewReadyToDrink" :
                    if(deviceType == "iPhone"){
                        $location.path("/iphone/viewReadyToDrink/home");
                    } else {
                        $location.path("/desktop/viewReadyToDrink");
                    }
                    break;

                case "viewSearch" :
                    if(deviceType == "iPhone"){
                        $location.path("/desktop/viewSearch");
                    } else {
                        $location.path("/desktop/viewSearch");
                    }
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
                    $location.path("/login");
                    break;

            }
        };

    }

]);