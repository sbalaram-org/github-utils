'use strict';

var fs = require('fs');
var os = require('os');

var sinon = require('sinon');
var should = require('should');



describe('git-utils', function() {
  var sandbox ;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('getReposbystars()', function() {
    
  });
});
