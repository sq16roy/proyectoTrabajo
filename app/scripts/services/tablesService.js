'use strict';

/**
 * @ngdoc function
 * @name angular15App.controller:DayCtrl
 * @description
 * # DayCtrl
 * Controller of the angular15App
 */
angular.module('tablesServices', [])

//service to get date from json file
.service('TableService', function() {
    var items = [];
     this.handleFile = function(e) {
        //console.log(e);
        var files = e;
        var f = files.file;
        {
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});
            //$scope.$apply(function(){
                items = to_json(workbook);
                //console.log(items);
            //});
            };
            reader.readAsBinaryString(f);
        }
        return items;
    };
    var X = XLSX;
    function to_json(workbook) {
        var tempData = [];
        var result = {};
        workbook.SheetNames.forEach(function(sheetName) {
            var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        //console.log(roa);
        tempData.push(
            {
            "name":sheetName,
            "items":roa
            }
        );
            if(roa.length > 0){
                result = tempData;
            //result = roa;
            }
        });
        return result;
    };
});