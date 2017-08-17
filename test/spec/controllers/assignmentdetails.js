'use strict';

describe('Controller: AssignmentdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('yoApp'));

  var AssignmentdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignmentdetailsCtrl = $controller('AssignmentdetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AssignmentdetailsCtrl.awesomeThings.length).toBe(3);
  });
});
