var tmp = require("tmp");
var Promise = require("bluebird");


// file 
module.exports.fileSync = tmp.fileSync;
var file = Promise.promisify(tmp.file, {multiArgs: true});
module.exports.file = function file$promise() {
  return file.apply(tmp, arguments).spread(function (path, fd, cleanup) {
    return {path: path, fd: fd, cleanup : cleanup };
  });
};

module.exports.withFile = function withFile(fn) {
  var cleanup;
  return module.exports.file.apply(tmp, arguments).then(function context(o) { 
    cleanup = o.cleanup;
    delete o.cleanup;
    return fn(o);
  }).finally(cleanup);
};

// directory 
module.exports.dirSync = tmp.dirSync;
var dir = Promise.promisify(tmp.dir, {multiArgs: true});
module.exports.dir = function dir$promise() {
  return dir.apply(tmp, arguments).spread(function (path, fd, cleanup) {
    return {path: path, fd: fd, cleanup : cleanup };
  });
};

module.exports.withDir = function withDir(fn) {
  var cleanup;
  return module.exports.dir.apply(tmp, arguments).then(function context(o) { 
    cleanup = o.cleanup;
    delete o.cleanup;
    return fn(o);
  }).finally(cleanup);
};

// name generation
module.exports.tmpNameSync = tmp.tmpNameSync;
module.exports.tmpName = Promise.promisify(tmp.tmpName);


module.exports.tmpdir = tmp.tmpdir;


module.exports.setGracefulCleanup = tmp.setGracefulCleanup;
