var tmp = require("tmp");
require('promise-spread');
const promisify = require("es6-promisify");

Promise.prototype.finally = function(onResolveOrReject) {
  return this.catch(function(reason){
    return reason;
  }).then(onResolveOrReject);
};

// file
module.exports.fileSync = tmp.fileSync;
var file = promisify(tmp.file, {multiArgs: true});

module.exports.file = function file$promise() {
  return file.apply(tmp, arguments).spread(function (path, fd, cleanup) {
    return {path: path, fd: fd, cleanup : cleanup };
  });
};

module.exports.withFile = function withFile(fn) {
  var cleanup;

  var params = Array.prototype.slice.call(arguments, 1);

  return module.exports.file.apply(tmp, params).then(function context(o) {
    cleanup = o.cleanup;
    delete o.cleanup;
    return fn(o);
  }).finally(function () {
    // May not pass any arguments to cleanup() or it fails.
    if (cleanup) {
      cleanup();
    }
  });
};


// directory
module.exports.dirSync = tmp.dirSync;
var dir = promisify(tmp.dir, {multiArgs: true});

module.exports.dir = function dir$promise() {
  return dir.apply(tmp, arguments).spread(function (path, cleanup) {
    return {path: path, cleanup: cleanup};
  });
};

module.exports.withDir = function withDir(fn) {
  var cleanup;

  var params = Array.prototype.slice.call(arguments, 1);

  return module.exports.dir.apply(tmp, params).then(function context(o) {
    cleanup = o.cleanup;
    delete o.cleanup;
    return fn(o);
  }).finally(function () {
    // May not pass any arguments to cleanup() or it fails.
    if (cleanup) {
      cleanup();
    }
  });
};


// name generation
module.exports.tmpNameSync = tmp.tmpNameSync;
module.exports.tmpName = promisify(tmp.tmpName);

module.exports.tmpdir = tmp.tmpdir;

module.exports.setGracefulCleanup = tmp.setGracefulCleanup;
