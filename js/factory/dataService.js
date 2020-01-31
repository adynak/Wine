wineInventory.factory("Data", 
    function($http, $q, $rootScope) {

        var factoryVariables = {
            excelData: {
                sheetName: null,
                columnDefs: null,
                gridData: null
            },
            sheetNames: null,
            missingBottles: [],
            spreadsheet: {}
        };

        var setExcel= function(rawData){
            factoryVariables.spreadsheet = rawData;
        }

        var getExcel = function(){
            return factoryVariables.spreadsheet;
        }

        var setMissingBottles = function(missingBottles){
            factoryVariables.missingBottles = missingBottles;
        }

        var getMissingBottles = function(){
            return factoryVariables.missingBottles;
        }  

        var startOver = function(){
            var resetExcel = {
                sheetName: null,
                columnDefs: null,
                gridData: null
            };
            Data.setExcel(resetExcel);
            $location.path("/home");
        }

        return {
            setExcel:setExcel,
            getExcel:getExcel,
            setMissingBottles: setMissingBottles,
            getMissingBottles: getMissingBottles,
            startOver: startOver

        };
    }
);