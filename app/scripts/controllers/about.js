'use strict';

/**
 * @ngdoc function
 * @name exelApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exelApp
 */
angular.module('exelApp')
  .controller('AboutCtrl', function ($scope, $rootScope, TableService, $timeout, $uibModal, $log) {
      //state of each nav project
      $scope.showImporRows = true;
      $scope.stateTemp = 0;
      $scope.myTempFile = {};
      $scope.myTempFile2 = {};
      $scope.changeStateTable = function(index) {
         $scope.stateTemp = index;
      };
      //clear input file
      $scope.clearTables = function() {
        angular.element( document.querySelector( '#exampleInputFile' ) ).val(null);
        $scope.myTempFile = '';
        $scope.stateTemp = 0;
      };
      //load file info from input
      $scope.loadTables = function() {
          
          if (!$scope.myTempFile) {
             alert("Error");
          } else {
            TableService.handleFile($scope.myTempFile).then(function(data){
              console.log(data);
              $scope.myTables = data;
              angular.element( document.querySelector( '#exampleInputFile' ) ).val(null);
              $scope.myTempFile = '';
              $scope.stateTemp = 0;
              $scope.showImporRows = false;
            });
          }
      };
      //function to delete a row from the project
      $scope.deleteRow = function(index) {
        console.log(index);
        $scope.myTables[$scope.stateTemp].items.splice(index,1);
      };
      //modal functions
      $scope.animationsEnabled = true;
      $scope.tempModalRow = '';
      $scope.open = function (size, index) {
        var controllers = '';
        switch(index) {
            case "edit":
                controllers = "ModalInstanceCtrl";
                break;
            case "newRow":
                controllers = "AddModalInstanceCtrl";
                $scope.tempModalRow = $scope.myTables[$scope.stateTemp];
                break;
            default:
                controllers = "ModalInstanceCtrl";
                $scope.tempModalRow = $scope.myTables[$scope.stateTemp];
                $scope.tempModalRow.id = index;
        };
      
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/modal.html',
          controller: controllers,
          size: size,
          resolve: {
            items: function () {
              $log.info(index);
              return $scope.tempModalRow;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };
      $scope.testError = function () {
        console.log($scope.myTables);
      }
      /*$scope.ok = function () {
        //$uibModalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };*/

      //add multiple rows
      $scope.addMultiplesRows = function() {
          console.log($scope.myTempFile);
          if (!$scope.myTempFile) {
             alert("Error");
          } else {
            TableService.handleFile($scope.myTempFile).then(function(data){
              var tempData = data[0].items;
              console.log(tempData);
              for (var i = 0; i < tempData.length; i++) {
                $scope.myTables[$scope.stateTemp].items.push(tempData[i]);
              };
              angular.element( document.querySelector( '#exampleInputFile' ) ).val(null);
              $scope.myTempFile = '';
              $scope.showImporRows = false;
            });
          }
      };
  });
