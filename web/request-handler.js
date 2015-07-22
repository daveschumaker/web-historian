var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  helper.serveAssets(res, '/index.html', function(err, file) {
    if (err) {
      res.writeHeader(500);
      res.end(err);
    } else {
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.end(file);
    }
  });
};
