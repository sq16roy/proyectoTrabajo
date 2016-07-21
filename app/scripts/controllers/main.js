'use strict';

/**
 * @ngdoc function
 * @name exelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exelApp
 */
angular.module('exelApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
