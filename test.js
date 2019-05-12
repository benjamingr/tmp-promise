const accessSync = require('fs').accessSync
const assert = require('assert')
const extname = require('path').extname

const tmp = require('.')


describe('withFile', function()
{
  it("file doesn't exist after going out of scope", function()
  {
    var filepath

    return tmp.withFile(function(o)
    {
      filepath = o.path

      accessSync(filepath)
      assert.strictEqual(extname(filepath), '.txt')
    }, {discardDescriptor: true, postfix: '.txt'})
    .then(function()
    {
      assert.throws(function()
      {
        accessSync(filepath)
      }, filepath + ' still exists')
    })
  })
})


describe('withDir', function()
{
  it("dir doesn't exist after going out of scope", function()
  {
    var filepath

    return tmp.withDir(function(o)
    {
      filepath = o.path

      accessSync(filepath)
      assert.strictEqual(extname(filepath), '.dir')
    }, {postfix: '.dir'})
    .then(function()
    {
      assert.throws(function()
      {
        accessSync(filepath)
      }, filepath + ' still exists')
    })
  })
})
