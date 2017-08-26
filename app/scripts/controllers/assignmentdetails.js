'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:AssignmentdetailsCtrl
 * @description
 * # AssignmentdetailsCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('AssignmentdetailsCtrl', function ($http, $scope,$route, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log("Params:",$routeParams.id);
    $http.get('/resources/assignments/assignment'+$routeParams.id+'.json').
    then(function onSuccess(response) {
      $scope.assignment = response.data;
      console.log("tengo una respuesta!", $scope.assignment );
    }).
    catch(function onError(response) {
      console.log(response);
    });
  });
