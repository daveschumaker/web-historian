var url = require('url');
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fs.readFile(archive.paths.siteAssets + '/index.html', function(err, file) {
    if (err) {
      res.writeHeader(500);
      res.write(err);
      res.end();
    } else {
      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(file);
      res.end();
    }
  });
};
