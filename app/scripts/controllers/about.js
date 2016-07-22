'use strict';

/**
 * @ngdoc function
 * @name exelApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exelApp
 */
angular.module('exelApp')
  .controller('AboutCtrl', function ($scope, $rootScope, TableService, $timeout) {
      $scope.stateTemp = 0;
      $scope.myTempFile = {};
      $scope.changeStateTable = function(index) {
         $scope.stateTemp = index;
      };
      $scope.chagreTables = function() {
          TableService.handleFile($scope.myTempFile).then(function(data){
            console.log(data);
            $scope.myTables = data;
          });
      }
  });
