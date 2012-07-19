var async = require('async'),
    fs = require('fs'),
    path = require('path'),
    patch = require('exists-patch'),
    utils = require('./utils');

// Code now targets 0.8.x, but allow it to run in 0.6.x for now
patch.patchForward();

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
      var appFile = path.resolve(that.configBasePath, that.appName + ".json");
      if(fs.existsSync(appFile)){
        fs.readFile(appFile, 'UTF-8', callback);
      } else {
        callback(null, null);
      }
    }
  ], function(err, results) {
    if(err) {
      console.log(err);
      return cb();
    }

    if(!results[1]) {
      console.log("WARNING: The app specific config file for the '" + that.appName + "' app is missing.");
    }
    
    var defaultConf = results[0] ? JSON.parse(results[0]) : {},
        appConf = results[1] ? JSON.parse(results[1]) : {},
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