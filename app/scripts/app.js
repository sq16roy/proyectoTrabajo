'use strict';

/**
 * @ngdoc overview
 * @name exelApp
 * @description
 * # exelApp
 *
 * Main module of the application.
 */
angular
  .module('exelApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angular-js-xlsx',
    'ui.router',
    'ngTouch'
  ])
  .config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('state1', {
            url: "/",
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('state2', {
            url: "/about",
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        });
  });
