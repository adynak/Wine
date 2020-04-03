wineDetective.directive("filelistBind", ['Data', 'modalService',
    function(Data, modalService) {
        return {
            link: function($scope, $elm, $attrs) {

                var applyWineType = function(bottle){
                    if (bottle.Type.includes("Rosé")){
                        if (!bottle.Varietal.includes("Rosé")){
                            bottle.Varietal = "Rosé" + txtCommon.of + bottle.Varietal;
                        }
                        if (!bottle.Wine.includes("Rosé")){
                            bottle.Wine = bottle.Wine + " Rosé";
                        }
                    }
                }

                $elm.on('change', function(changeEvent) {

                    var reader = new FileReader();

                    reader.onload = function(evt) {

                        $scope.$apply(function() {
                            var excel = {};
                            var sheets = [],
                                sheetName, sheetData, sheetColumns = [];
                            var excelSheetCount, ex;
                            var columns;
                            var sheetNumber = 1;
                            var data = evt.target.result;
                            var workbook = XLSX.read(data, {
                                type: 'binary'
                            });
                            var excelFileName = changeEvent.target.files[0].name;
                            var excelDateStamp = changeEvent.target.files[0].lastModified;

                            excelSheetCount = workbook.SheetNames.length;

                            for (var eX = 0; eX < excelSheetCount; eX++) {
                                sheetName = workbook.SheetNames[eX];
                                sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[eX]]);
                                columns = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[eX]], {
                                    header: 1
                                })[0];
                                var columnCheck = Data.checkRequiredColumns(columns);
                                sheetColumns = [];
                                columns.forEach(function(row1) {
                                    if (row1 == "Location") {
                                        sheetColumns.push({
                                            field: row1,
                                            enableColumnMenu: false,
                                            grouping: {
                                                groupPriority: 0
                                            }
                                        });
                                    } else {
                                        sheetColumns.push({
                                            field: row1,
                                            enableColumnMenu: false
                                        });
                                    }
                                });

                                sheetData.forEach(function(row) {
                                    row.inStock = true;
                                    row.isDuplicate = false;
                                    if (row.Vintage == 1001) row.Vintage = "NV";
                                    row.LocationAsArray = [row.Location];
                                    row.BinAsArray = [row.Bin];

                                    applyWineType(row);

                                    row.Varietal = he.encode(row.Varietal).replace("&#xEF;&#xBF;&#xBD;","&#233;");
                                    row.Designation = he.encode(row.Designation).replace("&#xEF;&#xBF;&#xBD;","&#233");
                                    row.Wine = he.encode(row.Wine).replace("&#xEF;&#xBF;&#xBD;","&#233");

                                    row.ProducerVarietal = row.Producer + row.Varietal;
                                    row.VarietalVintage = row.Varietal + row.Vintage;
                                    row.BarcodeAsArray = [row.Barcode];
                                    row.Designation = row.Designation.replace(row.Producer,"");

                                    if (row.Designation == "Unknown" || (typeof(row.Designation) == "undefined")){
                                        row.WineName = row.Producer;
                                    } else {
                                        row.WineName = row.Producer + " " + row.Designation;
                                    }

                                    if (row.Vineyard == "Unknown" || (typeof(row.Vineyard) == "undefined")){

                                    } else {
                                        row.WineName = row.WineName + " " + row.Vineyard;
                                    }

                                    row.shortWineName = row.Wine.replace(row.Producer,'').trim();

                                    if (row.EndConsume == 9999){
                                        row.EndConsume = "unknown";
                                    }
                                    if (row.BeginConsume == 9999){
                                        row.BeginConsume = "unknown";
                                    }
                                    row.EndConsumeVarietal = row.EndConsume + row.Varietal;

                                    if (row.BeginConsume + row.EndConsume == "unknownunknown") {
                                        drinkingWindow = txtCommon.guess;
                                    }
                                    if (row.BeginConsume == "unknown" && row.EndConsume !== "unknown") {
                                        drinkingWindow = txtCommon.before + " " + row.EndConsume;
                                    } else if (row.BeginConsume !== "unknown" && row.EndConsume !== "unknown") {
                                        drinkingWindow = row.BeginConsume + " - " + row.EndConsume;
                                    } else if (row.BeginConsume !== "unknown" && row.EndConsume == "unknown") {
                                        drinkingWindow = row.BeginConsume;
                                    }

                                    row.drinkingWindow = drinkingWindow;


                                });

                                sheets.push({
                                    sheetName: sheetName,
                                    gridData: sheetData,
                                    gridColumns: sheetColumns
                                });
                            }

                            excel.filename = excelFileName;
                            excel.sheetNames = workbook.SheetNames;
                            excel.sheets = sheets;
                            excel.dateStamp = localStorage.getItem("downloadDate");
                            excel.columnCheck = columnCheck;
                            Data.setExcel(excel);
                            $elm.val(null);
                            if (columnCheck.length > 0){
                                modalService.importColumnError(columnCheck);
                            }
                        });

                    };

                    reader.readAsBinaryString(changeEvent.target.files[0]);
                });

            }
        }
    }
]);

wineDetective.directive('ngEnter', function($document) {
    return {
        scope: {
            ngEnter: "&"
        },
        link: function(scope, element, attrs) {
            var enterWatcher = function(event) {
                if (event.which === 13) {
                    scope.ngEnter();
                    scope.$apply();
                    event.preventDefault();
                    $document.unbind("keydown keypress", enterWatcher);
                }
            };
            $document.bind("keydown keypress", enterWatcher);
        }
    }
});
