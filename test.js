var accessSync = require('fs').accessSync
var assert = require('assert')
var extname = require('path').extname

var tmp = require('.')


describe('withFile', function()
{
  it("file don't exists after going out of scope", function()
  {
    var filepath

    return tmp.withFile(function(o)
    {
      filepath = o.path

      accessSync(filepath)
      assert.strictEqual(extname(filepath), '.txt')
    }, {postfix: '.txt'})
    .then(function()
    {
      assert.throws(function()
      {
        accessSync(filepath)
      })
    })
  })
})


describe('withDir', function()
{
  it("dir don't exists after going out of scope", function()
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
      })
    })
  })
})
