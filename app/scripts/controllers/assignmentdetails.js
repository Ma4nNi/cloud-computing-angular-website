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
    $scope.exceptionAssignments = [4,5,6];
    $scope.assignmentIsException = false;

    for(var i=0;i<$scope.exceptionAssignments.length; i++){
      console.log(i);
      if($scope.exceptionAssignments[i]==$routeParams.id){
        $scope.assignmentIsException = true;
        
      }
    }
    if($scope.assignmentIsException){
      $scope.exceptionHtml = '/resources/assignments/assignment'+$routeParams.id+'.html';
    }
    else{
      console.log("Params:",$routeParams.id);
      $http.get('/resources/assignments/assignment'+$routeParams.id+'.json').
      then(function onSuccess(response) {
        $scope.assignment = response.data;
        console.log("tengo una respuesta!", $scope.assignment );
      }).
      catch(function onError(response) {
        console.log(response);
      });

    }



    

  });
