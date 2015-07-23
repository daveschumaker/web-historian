var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
  //list: path.join(__dirname, '../test/testdata/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(this.paths.list, function(err, data) {
    var urlArray;
    if (err) {
      return;
    } else {
      urlArray = data.toString();
      urlArray = urlArray.split('\n');
      return callback(urlArray);
    }
  });

};

exports.isUrlInList = function(target, callback){
  var found = false;
  var urlArray;

  fs.readFile(this.paths.list, function(err, data) {
    if (err) {
      return;
    } else {
      urlArray = data.toString();
      urlArray = urlArray.split('\n');
      for (var i = urlArray.length - 1; i >= 0; i--) {
        if (urlArray[i] === target) {
          found = true;
        } 
      }
    }
  });

  if (found === true) {
    callback(target);
  } else {
    callback(false);
  }
};
exports.addUrlToList = function(url, callback){
  var that = this;
  fs.appendFileSync(this.paths.list, url + '\n');
  callback();
};

exports.isUrlArchived = function(){
};

exports.downloadUrls = function(){
};
