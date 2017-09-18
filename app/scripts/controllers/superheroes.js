'use strict';

/**
 * @ngdoc function
 * @name yoApp.controller:SuperheroesCtrl
 * @description
 * # SuperheroesCtrl
 * Controller of the yoApp
 */
angular.module('yoApp')
  .controller('SuperheroesCtrl', function ($http, $scope,$route, $routeParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.heroes = [];

    //var sampleUrl = "http://demo5292390.mockable.io/getDCBat";

    //var sampleUrl= "http://comicvine.gamespot.com/api/characters/?api_key=3500994b89773681c6f41564eb101166f41caa34&format=json&field_list=id,name,api_detail_url&filter=name:bat";
    var apiKey = '3500994b89773681c6f41564eb101166f41caa34';
    //
    // $scope.onLoad=function(){
    //   var sampleUrl="https://jr8gulay1b.execute-api.us-east-1.amazonaws.com/dev/comics/characters";
    //   $.get(sampleUrl, function(data, status){
    //     console.log("Data: " + data + "\nStatus: " + status);
    //     console.log(data);
    //     $scope.superHeroes=data.results;
    //     jQuery.each(data.results, function(i, val) {
    //       $("#char1").append("<option value='"+val.id+"'>val.name</option>");
    //     });
    //     $("#char1").select2();
    //   });
    // }



    // $scope.getSuperHeroes = function (stringValue) {
    //   console.log("searching for:", stringValue);
    //
    //   var url = "https://comicvine.gamespot.com/api/characters/?api_key="+apiKey+"&format=json&field_list=id,name,api_detail_url&filter=name:"+stringValue;
    //   console.log("url:", url);
    //   $.ajax({
    //     url:url ,
    //     dataType: 'json',
    //     data:{},
    //     crossDomain:true,
    //     headers:{'Access-Control-Allow-Origin':'*'},
    //     success: function(results){
    //       console.log("yay",results);
    //     },
    //     error:function(err){
    //       console.log(err);
    //     }
    //   });
    // }

  });
