'use strict';

describe('Controller: AssignmentsCtrl', function () {

  // load the controller's module
  beforeEach(module('yoApp'));

  var AssignmentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignmentsCtrl = $controller('AssignmentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AssignmentsCtrl.awesomeThings.length).toBe(3);
  });
});
