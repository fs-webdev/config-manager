/**
 * Take a variable number of object arguments and extend a base object with each of the properties in those
 * objects starting from left to right.
 */
exports.extend = function extend() {
  var merged = {};
  
  for(var i=0; i<arguments.length; ++i) {
    var obj = arguments[i] || {};
    for(var key in obj) {
      merged[key] = obj[key];
    }
  }
  return merged;
};