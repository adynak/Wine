wineDetective.factory("Data",
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

        var getGridHeight = function(){
            return factoryVariables.gridHeight;
        }

        var setGridHeight = function(){
            var factor;
            var deviceType = getDeviceType().toLowerCase();
            switch (deviceType) {
                case "iphone":
                    factor = 0.382922;
                    break
                default:
                    factor = 0.30;
                    break;
            }
            var ratio = window.devicePixelRatio || 1;
            var w = screen.width * ratio;
            var height = screen.height * ratio;
            factoryVariables.gridHeight = Math.round(height * factor) + "px";
        }

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

        var setDeviceType = function(userAgent){
            var deviceType = "desktop";
            userAgent = userAgent.toLowerCase();

            if (userAgent.indexOf("iphone") != -1){
                deviceType = "iPhone";
            }
            if (userAgent.indexOf("ipod") != -1){
                deviceType = "iPod";
            }
            if (userAgent.indexOf("ipad") != -1){
                deviceType = "iPad";
            }
            factoryVariables.deviceType = deviceType;
        }

        var getDeviceType = function(){
            return factoryVariables.deviceType;
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

        var setViewName = function(viewName,bottleCount){
            if (typeof(bottleCount) == "undefined"){
                factoryVariables.viewName = viewName
            } else {
                factoryVariables.viewName = viewName + " (" + bottleCount + ")";
            }
        }

        var getViewName = function(){
          if (factoryVariables.viewName == "Wine Detective"){
            if (getDeviceType() == "iPhone"){
                return factoryVariables.viewName;
            } else {
                return "";
            }
          } else {
            return factoryVariables.viewName;
          }
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

        var countReadyToDrink = function(excelData){
            let index = { };
            let result = [ ];
            excelData.forEach(point => {
                let key = point.EndConsume ;
                if (key in index) {
                    index[key].count++;
                } else {
                    if (point.EndConsume == 9999){
                        point.EndConsume = "unknown";
                    }
                    let newEntry = { readyToDrink : point.EndConsume, count: 1 };
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

        var countProducerVaritals = function(excelData){
            let index = { };
            let result = [ ];
            excelData.forEach(point => {
                let key = point.ProducerVarietal ;
                if (key in index) {
                    index[key].count++;
                } else {
                    let newEntry = { name: point.ProducerVarietal, count: 1 };
                    index[key] = newEntry;
                    result.push(newEntry);
                }
            });
            return result;
        }

        var countVaritalVintages = function(excelData){
            let index = { };
            let result = [ ];
            excelData.forEach(point => {
                let key = point.VarietalVintage ;
                if (key in index) {
                    index[key].count++;
                } else {
                    let newEntry = { name: point.VarietalVintage, count: 1 };
                    index[key] = newEntry;
                    result.push(newEntry);
                }
            });
            return result;
        }

        var countEndConsumeVaritals = function(excelData){
            let index = { };
            let result = [ ];
            excelData.forEach(point => {
                let key = point.EndConsumeVarietal ;
                if (key in index) {
                    index[key].count += point.LocationAsArray.length ;
                } else {
                    let newEntry = { name: point.EndConsumeVarietal, count: point.LocationAsArray.length };
                    index[key] = newEntry;
                    result.push(newEntry);
                }
            });
            return result;
        }

        var countProducers = function(excelData){
            let index = { };
            let result = [ ];
            excelData.forEach(point => {
                let key = point.Producer ;
                if (key in index) {
                    index[key].count++;
                } else {
                    let newEntry = { producer: point.Producer, count: 1 };
                    index[key] = newEntry;
                    result.push(newEntry);
                }
            });
            return result;
        };

        var setIphoneReadyToDrinkVarietals = function(varietals){
            factoryVariables.iPhoneReadyToDrinkVarietals = varietals;
        }

        var getIphoneReadyToDrinkVarietals = function(){
            return factoryVariables.iPhoneReadyToDrinkVarietals;
        }

        var setIphoneProducers = function(producers){
            factoryVariables.iPhoneProducers = producers;
        }

        var getIphoneProducers = function(){
            return factoryVariables.iPhoneProducers;
        }

        var setIphoneVintages = function(vintages){
            factoryVariables.iPhoneVintages = vintages;
        }

        var getIphoneVintages = function(){
            return factoryVariables.iPhoneVintages;
        }

        var setIphoneVarietals = function(varietals){
            factoryVariables.iPhoneVarietals = varietals;
        }

        var getIphoneVarietals = function(){
            return factoryVariables.iPhoneVarietals;
        }

        var setIphoneBottleList = function(bottleList){
            factoryVariables.bottleList = bottleList;
        }

        var getIphoneBottleList = function(){
            return factoryVariables.bottleList;
        }

        var setIphoneReconcileBins = function(bottleList){
            factoryVariables.reconcileBins = bottleList;
        }

        var getIphoneReconcileBins = function(){
            return factoryVariables.reconcileBins;
        }

        var setIphoneReconcileBottles = function(bottleList){
            factoryVariables.reconcileBottles = bottleList;
        }

        var getIphoneReconcileBottles = function(){
            return factoryVariables.reconcileBottles;
        }

        var removeDuplicateRows = function(bottles) {
            // reset these arrays to a single value
            for (i = 0; i < bottles.length; ++i) {
                bottles[i].LocationAsArray = [bottles[i].Location];
                bottles[i].BinAsArray = [bottles[i].Bin];
                bottles[i].BarcodeAsArray = [bottles[i].Barcode];
            }

            for (i = 1; i < bottles.length; ++i) {
                if (bottles[i].iWine == bottles[i - 1].iWine) {
                    bottles[i].isDuplicate = true;

                    // find the previous row that is NOT a duplicate
                    row = 0;
                    done = false;
                    do {
                        row++;
                        if (bottles[i - row].isDuplicate) {

                        } else {
                            bottles[i - row].LocationAsArray.push(bottles[i].Location);
                            bottles[i - row].BinAsArray.push(bottles[i].Bin);
                            bottles[i - row].BarcodeAsArray.push(bottles[i].Barcode);
                            done = true
                        }
                    }
                    while (done == false);

                } else {
                    bottles[i].isDuplicate = false;
                }
            }
            return bottles;

        };

        var checkRequiredColumns = function(columns){
            var columnCheck = Array();
            var requiredColumns = Array();
            var isHere, columnMissing;
            
            requiredColumns.push("Barcode");
            requiredColumns.push("iWine");
            requiredColumns.push("Type");
            requiredColumns.push("Vintage");
            requiredColumns.push("Wine");
            requiredColumns.push("Producer");
            requiredColumns.push("Varietal");
            requiredColumns.push("Designation");
            requiredColumns.push("Vineyard");
            requiredColumns.push("Appellation");
            requiredColumns.push("Location");
            requiredColumns.push("Bin");
            requiredColumns.push("BeginConsume");
            requiredColumns.push("EndConsume");
            requiredColumns.push("WindowSource");

            requiredColumns.forEach(function(columnName){
                isHere = columns.includes(columnName);
                if (!isHere){
                    columnMissing = {columnName:columnName,message:'missing'};
                    columnCheck.push(columnMissing);
                }
            });

            return columnCheck;
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
            countVintages: countVintages,
            countProducers: countProducers,
            countProducerVaritals: countProducerVaritals,
            countReadyToDrink: countReadyToDrink,
            removeDuplicateRows: removeDuplicateRows,
            countVaritalVintages: countVaritalVintages,
            setDeviceType: setDeviceType,
            getDeviceType: getDeviceType,
            setIphoneVintages: setIphoneVintages,
            getIphoneVintages: getIphoneVintages,
            setIphoneVarietals: setIphoneVarietals,
            getIphoneVarietals: getIphoneVarietals,
            setIphoneBottleList: setIphoneBottleList,
            getIphoneBottleList: getIphoneBottleList,
            getGridHeight: getGridHeight,
            setGridHeight: setGridHeight,
            setIphoneProducers: setIphoneProducers,
            getIphoneProducers: getIphoneProducers,
            countEndConsumeVaritals: countEndConsumeVaritals,
            setIphoneReadyToDrinkVarietals: setIphoneReadyToDrinkVarietals,
            getIphoneReadyToDrinkVarietals: getIphoneReadyToDrinkVarietals,
            setIphoneReconcileBins: setIphoneReconcileBins,
            getIphoneReconcileBins: getIphoneReconcileBins,
            setIphoneReconcileBottles: setIphoneReconcileBottles,
            getIphoneReconcileBottles: getIphoneReconcileBottles,
            checkRequiredColumns: checkRequiredColumns
        };
    }
);

wineDetective.factory("AsOfDate", function(){
  var asOfDate = "";

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

wineDetective.factory("modalService",
    [
        "$rootScope",
        "$uibModal",
        "Data",
        "$location",

        function($rootScope, $uibModal, Data, $location) {

            var showMeTheBottles = function(row) {
                var showFixButton;

                if ($location.path().search("viewMissingDrinkByDate") >= 0 ||
                    $location.path().search("fixMissingBottle") >= 0) {
                    showFixButton = true;
                } else {
                    showFixButton = false;
                }

                var drinkingWindow, displayDrinkingWindow = "inline";
                var opened = Array();

                var locationBin = Data.locationBin(row);

                if (row.entity.Wine.indexOf(row.entity.Varietal) >= 0) {
                    wineType = "";
                } else {
                    wineType = row.entity.Varietal;
                }

                if (row.entity.BeginConsume + row.entity.EndConsume == "unknownunknown") {
                    displayDrinkingWindow = "none";
                }

                if (row.entity.BeginConsume == "unknown" && row.entity.EndConsume !== "unknown") {
                    drinkingWindow = txtCommon.before + " " + row.entity.EndConsume;
                } else if (row.entity.BeginConsume !== "unknown" && row.entity.EndConsume !== "unknown") {
                    drinkingWindow = row.entity.BeginConsume + " - " + row.entity.EndConsume;
                } else if (row.entity.BeginConsume == "unknown" || row.entity.EndConsume == "unknown") {
                    displayDrinkingWindow = "none";
                }

                for (var i = 0; i < row.entity.LocationAsArray.length; i++) {
                    opened[i] = false;
                }

                var modalScope = $rootScope.$new();
                modalScope.bottle = {
                    bottleCount: row.entity.Location.length,
                    vintage: he.decode(row.entity.Vintage),
                    wine: he.decode(row.entity.Wine),
                    location: locationBin,
                    plurals: txtCommon.plurals,
                    drinkingWindow: drinkingWindow,
                    displayDrinkingWindow: displayDrinkingWindow,
                    wineType: he.decode(wineType),
                    locationsAsArray: row.entity.LocationAsArray,
                    binAsArray: row.entity.BinAsArray,
                    BarcodeAsArray: row.entity.BarcodeAsArray,
                    displayCheckbox: "none",
                    opened: opened,
                    showFixButton: showFixButton,
                    iWine: row.entity.iWine
                };
                $uibModal.open({
                    scope: modalScope,
                    animation: true,
                    templateUrl: "views/wheresMyWineModal.html",
                    controller: function($scope, $uibModalInstance) {
                        $scope.prompts = txtModal;

                        $scope.ok = function() {
                            $uibModalInstance.close();
                        };

                        $scope.fix = function() {
                            var url = "https://www.cellartracker.com/editpersonal.asp?iWine=" + modalScope.bottle.iWine;
                            window.open(url)
                            $uibModalInstance.close();
                        };

                        $scope.drink = function(bottle) {
                            if (bottle.displayCheckbox == "inline") {
                                for (var i = 0; i < bottle.locationsAsArray.length; i++) {
                                    if (bottle.opened[i]) {
                                        console.log(bottle.locationsAsArray[i], bottle.binAsArray[i], bottle.BarcodeAsArray[i])
                                    }
                                }
                                $uibModalInstance.close();
                            }
                            bottle.displayCheckbox = "inline";
                        };

                    }

                });


            };

            var startOver = function() {
                $uibModal.open({
                    templateUrl: "views/modal.html",
                    controller: function($scope, $uibModalInstance) {
                        $scope.prompts = txtModal;

                        $scope.ok = function() {
                            var resetExcel = {
                                sheetName: null,
                                columnDefs: null,
                                gridData: null
                            };
                            Data.setExcel(resetExcel);
                            $uibModalInstance.close();
                            $location.path("/home");
                        };

                        $scope.cancel = function() {
                            $uibModalInstance.close();
                            $location.path("/home");
                        };
                    }

                });

            };

            var importColumnError = function(missingColumns){
                var modalScope = $rootScope.$new();
                modalScope.error = {
                    title: "aergaefg",
                    columns: missingColumns
                };

                $uibModal.open({
                    scope: modalScope,
                    animation: true,
                    templateUrl: "views/importErrorModal.html",
                    controller: function($scope, $uibModalInstance) {
                        $scope.prompts = txtErrors;

                        $scope.ok = function() {
                            $uibModalInstance.close();
                        };
                    }

                });
            }

            return {
                showMeTheBottles: showMeTheBottles,
                startOver: startOver,
                importColumnError: importColumnError

            };
        }
    ]
);