'use strict';

var path = require('path');
var util = require('util');

var bunyan = require('bunyan');
var moment = require('moment');



exports = module.exports = {


  feature_message: function() {
      console.log("Feature in development Coming Soon");
  },
  error_handler: function(error) {
    var message = 'caught error: ' + error.name + ', code: ' + error.status + '\n';
    if (error.errors != null ) {
      message = message + JSON.stringify(error.errors);
    }
    console.log(message);
  }
};
