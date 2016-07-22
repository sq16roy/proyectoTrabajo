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
      $scope.costumer = {};
      $scope.changeStateTable = function(index) {
         $scope.stateTemp = index;
      };
      $scope.testing = function() {
          $scope.test = TableService.handleFile($scope.costumer);
      }
  });
