const {promisify} = require("util");
const tmp = require("tmp");

// file
module.exports.fileSync = tmp.fileSync;
module.exports.file = promisify(
  (options, cb) => tmp.file(
    options,
    (err, path, fd, cleanup) => cb(err, {path, fd, cleanup})
  )
);

module.exports.withFile = async function withFile(fn, options) {
  const { path, fd, cleanup } = await module.exports.file(options);
  try {
    return await fn({ path, fd });
  } finally {
    await promisify(cleanup)();
  }
};


// directory
module.exports.dirSync = tmp.dirSync;
module.exports.dir = promisify(
  (options, cb) => tmp.dir(
    options,
    (err, path, cleanup) => cb(err, {path, cleanup})
  )
);

module.exports.withDir = async function withDir(fn, options) {
  const { path, cleanup } = await module.exports.dir(options);
  try {
    return await fn({ path });
  } finally {
    await promisify(cleanup)();
  }
};


// name generation
module.exports.tmpNameSync = tmp.tmpNameSync;
module.exports.tmpName = promisify(tmp.tmpName);

module.exports.tmpdir = tmp.tmpdir;

module.exports.setGracefulCleanup = tmp.setGracefulCleanup;
