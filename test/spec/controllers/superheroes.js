'use strict';

describe('Controller: SuperheroesCtrl', function () {

  // load the controller's module
  beforeEach(module('yoApp'));

  var SuperheroesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuperheroesCtrl = $controller('SuperheroesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SuperheroesCtrl.awesomeThings.length).toBe(3);
  });
});
