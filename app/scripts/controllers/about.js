'use strict';

/**
 * @ngdoc function
 * @name exelApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exelApp
 */
angular.module('exelApp')
  .controller('AboutCtrl', function ($scope,$rootScope) {
  //var xlf = document.getElementById('xlf');
  $scope.handleFile = function(e) {
    console.log(e);
    var files = e.target.files;
    var f = files[0];
    {
      var reader = new FileReader();
      var name = f.name;
      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        $scope.items = to_json(workbook);
        console.log($scope.items);
      };
      reader.readAsBinaryString(f);
      //reader.readAsArrayBuffer(f);
    }
  }
  var X = XLSX;
  function to_json(workbook) {
  var tempData = [];
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    console.log(roa);
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
$scope.stateTemp = 0;
$scope.changeStateTable = function(index) {
    $scope.stateTemp = index;
};

 // if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);

  });
