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

        var setViewName = function(viewName){
            factoryVariables.viewName = viewName;
        }

        var getViewName = function(){
            return factoryVariables.viewName;
        }

        var locationBin = function(row){

            var temp, locations = Array();

            for (var x = 0 ; x < row.entity.LocationAsArray.length; x++){
                temp = {
                    whereItIs: row.entity.LocationAsArray[x] + " - Bin " + row.entity.BinAsArray[x]
                }
                locations.push(temp);
            }

            let obj = {};

            locations.forEach(entry => (obj[entry.whereItIs] = (obj[entry.whereItIs] || 0) + 1));
            let locationBin = [];
            for (whereItIs in obj) {
                locationBin.push({
                    location: whereItIs,
                    count: obj[whereItIs]
                });
            }
            return locationBin;
        }

        var countVarietals = function(excelData){
            let index = { };
            let result = [ ];
            excelData.forEach(point => {
                let key = point.Varietal ;
                if (key in index) {
                    index[key].count++;
                } else {
                    let newEntry = { varietal: point.Varietal, count: 1 };
                    index[key] = newEntry;
                    result.push(newEntry);
                }
            });
            return result;
        }

        var countVintages = function(excelData){
            let index = { };
            let result = [ ];
            excelData.forEach(point => {
                let key = point.VarietalVintage ;
                if (key in index) {
                    index[key].count++;
                } else {
                    let newEntry = { vintage: point.VarietalVintage, count: 1 };
                    index[key] = newEntry;
                    result.push(newEntry);
                }
            });
            return result;
        }

        return {
            setExcel:setExcel,
            getExcel:getExcel,
            setMissingBottles: setMissingBottles,
            getMissingBottles: getMissingBottles,
            startOver: startOver,
            setViewName: setViewName,
            getViewName: getViewName,
            locationBin: locationBin,
            countVarietals: countVarietals,
            countVintages: countVintages
        };
    }
);

wineInventory.factory('AsOfDate', function(){
  var asOfDate = '';

  var getAsOfDate = function(){
    return asOfDate;
  }

  var setAsOfDate = function(newAsOfDate){
    asOfDate = newAsOfDate;
  }

  return {
    getAsOfDate: getAsOfDate,
    setAsOfDate: setAsOfDate
  };
});
