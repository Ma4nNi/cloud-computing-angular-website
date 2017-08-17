'use strict';

describe('Service: FileGetter', function () {

  // load the service's module
  beforeEach(module('yoApp'));

  // instantiate service
  var FileGetter;
  beforeEach(inject(function (_FileGetter_) {
    FileGetter = _FileGetter_;
  }));

  it('should do something', function () {
    expect(!!FileGetter).toBe(true);
  });

});
