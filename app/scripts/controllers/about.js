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
      $scope.stateTemp = 0;
      $scope.myTempFile = {};
      $scope.changeStateTable = function(index) {
         $scope.stateTemp = index;
      };
      $scope.clearTables = function() {
        angular.element( document.querySelector( '#exampleInputFile' ) ).val(null);
        $scope.myTempFile = '';
        $scope.stateTemp = 0;
      }
      $scope.chagreTables = function() {
          
          if (!$scope.myTempFile) {
             alert("Error");
          } else {
            TableService.handleFile($scope.myTempFile).then(function(data){
              console.log(data);
              $scope.myTables = data;
              angular.element( document.querySelector( '#exampleInputFile' ) ).val(null);
              $scope.myTempFile = '';
              $scope.stateTemp = 0;
            });
          }
      };
      $scope.deleteRow = function(index) {
        console.log(index);
        $scope.myTables[$scope.stateTemp].items.splice(index,1);
      };
      //modal functions
      $scope.animationsEnabled = true;
      $scope.tempModalRow = '';
      $scope.open = function (size, index) {

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/modal.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              $log.info($scope.myTables[$scope.stateTemp]);
              $scope.tempModalRow = $scope.myTables[$scope.stateTemp];
              $scope.tempModalRow.id = index;
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

      $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      //datePicker
      
  });
