wineInventory.controller('HomeController', 
    [
        '$scope', 
        '$http', 
        '$location', 
        'Data', 
        '$rootScope', 
        '$routeParams', 

    function($scope, $http, $location, Data, $rootScope, $routeParams) {

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
                $scope.sheetNames    = spreadsheet.sheetNames;
                showFilename = true;
                $location.path("/viewInventory");
            }
            return showFilename;
        }

    }

]);