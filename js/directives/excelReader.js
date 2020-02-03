wineInventory.directive("filelistBind", [ 'Data',
    function (Data) {
      return {
        link: function ($scope, $elm, $attrs) {

          $elm.on('change', function (changeEvent) {

            var reader = new FileReader();
            
            reader.onload = function (evt) {

              $scope.$apply(function () {
                var excel = {};
                var sheets = [], sheetName, sheetData, sheetColumns = [];
                var excelSheetCount, ex;
                var columns;
                var sheetNumber = 1;
                var data = evt.target.result;
                var workbook = XLSX.read(data, {type: 'binary'});
                var excelFileName = changeEvent.target.files[0].name;
                var excelDateStamp = changeEvent.target.files[0].lastModified;

                excelSheetCount = workbook.SheetNames.length;

                for (var eX = 0 ; eX < excelSheetCount ; eX++){
                    sheetName    = workbook.SheetNames[eX];
                    sheetData    = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[eX]]);
                    columns      = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[eX]], { header: 1 })[0];
                    sheetColumns = [];
                    columns.forEach(function (row1) {
                        if (row1 == "Location"){
                            sheetColumns.push({ field: row1, 
                                                enableColumnMenu: false,
                                                grouping: {
                                                    groupPriority: 0
                                                    }
                                                });
                        } else {
                            sheetColumns.push({ field: row1, enableColumnMenu: false });
                        }
                    });                

                    sheetData.sort(function (wine1, wine2) {
                        if (wine1.Location > wine2.Location) return 1;
                        if (wine1.Location < wine2.Location) return -1;

                        if (wine1.Bin < wine2.Bin) return -1;
                        if (wine1.Bin > wine2.Bin) return 1;
                    });

                    sheetData.forEach(function(row) {
                        row.inStock = false;
                    });

                    sheets.push(
                    {
                        sheetName: sheetName,
                        gridData: sheetData,
                        gridColumns : sheetColumns
                    });
                }
                
                excel.filename = excelFileName;
                excel.sheetNames = workbook.SheetNames;
                excel.sheets = sheets;
                excel.dateStamp = moment(excelDateStamp).format("MM-DD-YYYY h:mm:ss A");
                debugger;
                Data.setExcel(excel);
                $elm.val(null);
              });

            };

            reader.readAsBinaryString(changeEvent.target.files[0]);
          });

        }
      }
    }
]);
