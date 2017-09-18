'use strict';

/**
 * @ngdoc overview
 * @name yoApp
 * @description
 * # yoApp
 *
 * Main module of the application.
 */
angular
  .module('yoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/assignment/:id', {
        templateUrl: 'views/assignmentdetails.html',
        controller: 'AssignmentdetailsCtrl',
        controllerAs: 'assignmentdetails'
      })
      .when('/performance', {
        templateUrl: 'views/performance.html',
        controller: 'PerformanceCtrl',
        controllerAs: 'performance'
      })
      .when('/superHeroes', {
        templateUrl: 'views/superheroes.html',
        controller: 'SuperheroesCtrl',
        controllerAs: 'superHeroes'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
