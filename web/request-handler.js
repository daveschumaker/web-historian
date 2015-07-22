var fs = require('fs');
var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers');

// require more modules/folders here!

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      helper.serveAssets(res, '/index.html', function(err, data) {
        res.writeHead(200, headers);
        res.end(data)
      })
    } else {
      var fixtureName = url.parse(req.url).pathname;
      console.log(fixtureName);
      console.log("Path: " + archive.paths.archivedSites);
      fs.readFile(archive.paths.archivedSites + '/' + fixtureName, function(err, data) {
        if (err) {
          res.writeHead(404, headers);
          res.end('nope');
        } else {
          // We found something!!!
          res.writeHead(200, headers);
          // res.write(JSON.stringify(fixtureName));
          res.end(data);
        }
      });
    }
  }
};
