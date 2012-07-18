var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils');

function Config(configBasePath, targetEnv, appName, cb) {
  this.configBasePath = configBasePath || '../config';
  this.targetEnv = targetEnv || 'local';
  this.appName = appName || '';
  this.env = {};
  
  this.computeEnv(cb);
}
var proto = Config.prototype;

proto.computeEnv = function computeEnv(cb) {
  var that = this;
  
  async.parallel([
    function(callback) {
      fs.readFile(path.resolve(that.configBasePath, 'default.json'), 'UTF-8', callback);
    },
    
    function(callback) {
      fs.readFile(path.resolve(that.configBasePath, that.appName + ".json"), 'UTF-8', callback);
    }
  ], function(err, results){
    if(err) {
      console.log(err);
      return cb();
    }
    
    var defaultConf = JSON.parse(results[0]),
        appConf = JSON.parse(results[1]),
        finalConf = {};
    
    finalConf = utils.extend(finalConf, defaultConf["default"]);
    finalConf = utils.extend(finalConf, appConf["default"]);
    finalConf = utils.extend(finalConf, defaultConf[that.targetEnv]);
    finalConf = utils.extend(finalConf, appConf[that.targetEnv]);
    
    that.env = finalConf;
    
    return cb();
  });
};

/**
 * Export the init function for creating new Config objects
 */
exports.init = function(configBasePath, targetEnv, appName, cb) {
  return new Config(configBasePath, targetEnv, appName, cb);
};