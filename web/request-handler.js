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
};

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    // console.log(archive.downloadUrls(['www.google.com']));
    if (req.url === '/') {
      helper.serveAssets(res, '/index.html', function(err, data) {
        headers['Content-Type'] = "text/html";
        res.writeHead(200, headers);
        res.end(data);
      });
    } else if (req.url === '/styles.css') {
      helper.serveAssets(res, '/styles.css', function(err, data) {
        headers['Content-Type'] = "text/css";
        res.writeHead(200, headers);
        res.end(data);
      }); 
    } else if (req.url === '/scripts/jquery-min.js') {
      helper.serveAssets(res, '/scripts/jquery-min.js', function(err, data) {
        headers['Content-Type'] = "text/javascript";
        res.writeHead(200, headers);
        res.end(data);
      });         
    } else {
      var fixtureName = url.parse(req.url).pathname;
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

  var urlStr;
  if (req.method === 'POST') {
    req.on('data', function(data) {
      // if (data.subString(0, 4) === 'url=') {
      //   data = JSON.stringify(data);
      // }
      data = data.toString().slice(4)
      data = JSON.stringify(data);
      data = JSON.parse(data);
      urlStr = data + '\n';
      console.log('URL?? ' + urlStr);
      console.log(archive.paths.list);

      fs.appendFile(archive.paths.list, urlStr, function(err) {
        if (err) {
          res.writeHead(500, headers);
          res.end('error');
        } else {
          res.writeHead(201, headers);
          res.end('success!');          
        }
      });

    });

    res.on('end', function() {

    });
  }
};
