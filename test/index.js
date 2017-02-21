/* globals describe it */
var assert = require('assert')
var util = require('util')
var Settings = require('../')

describe('Settings', function () {
  describe('.set()', function () {
    it('should set a value', function () {
      var app = new Settings()
      app.set('foo', 'bar')
      assert.equal(app.get('foo'), 'bar')
    })

    it('should return the app', function () {
      var app = new Settings()
      assert.equal(app.set('foo', 'bar'), app)
    })

    it('should return the app when undefined', function () {
      var app = new Settings()
      assert.equal(app.set('foo', undefined), app)
    })
  })

  describe('.get()', function () {
    it('should return undefined when unset', function () {
      var app = new Settings()
      assert.strictEqual(app.get('foo'), undefined)
    })
    it('should otherwise return the value', function () {
      var app = new Settings()
      app.set('foo', 'bar')
      assert.equal(app.get('foo'), 'bar')
    })
  })

  describe('.enable()', function () {
    it('should set the value to true', function () {
      var app = new Settings()
      assert.equal(app.enable('tobi'), app)
      assert.strictEqual(app.get('tobi'), true)
    })
  })

  describe('.disable()', function () {
    it('should set the value to false', function () {
      var app = new Settings()
      assert.equal(app.disable('tobi'), app)
      assert.strictEqual(app.get('tobi'), false)
    })
  })

  describe('.enabled()', function () {
    it('should default to false', function () {
      var app = new Settings()
      assert.strictEqual(app.enabled('foo'), false)
    })

    it('should return true when set', function () {
      var app = new Settings()
      app.set('foo', 'bar')
      assert.strictEqual(app.enabled('foo'), true)
    })
  })

  describe('.disabled()', function () {
    it('should default to true', function () {
      var app = new Settings()
      assert.strictEqual(app.disabled('foo'), true)
    })

    it('should return false when set', function () {
      var app = new Settings()
      app.set('foo', 'bar')
      assert.strictEqual(app.disabled('foo'), false)
    })
  })

  describe('setters', function () {
    it('should call the setter method', function () {
      var app = new Settings({
        setters: {
          foo: function (val) {
            this.set('foobar', 'foo' + val)
          }
        }
      })
      app.set('foo', 'bar')
      assert.equal(app.get('foo'), 'bar')
      assert.equal(app.get('foobar'), 'foobar')
    })
  })

  describe('mixin/inheritance', function () {
    /*
    it('should allow es2015 style class inheritance', function () {
      class Foo extends Settings {
        constructor () {
          super({
            setters: {
              bar: function (val) {
                this.set('foobar', 'foo' + val)
              }
            }
          })
        }
        foo () {
          return this.get('bar')
        }
      }

      var f = new Foo()
      f.set('bar', 'bar')
      assert.equal(typeof f.foo, 'function')
      assert.equal(f.foo(), 'bar')
      assert.equal(f.get('foobar'), 'foobar')
    })
    */

    it('should allow es5 style class inheritance', function () {
      var Foo = function () {
        Settings.call(this, {
          setters: {
            bar: function (val) {
              this.set('foobar', 'foo' + val)
            }
          }
        })
      }
      util.inherits(Foo, Settings)
      Foo.prototype.foo = function () {
        return this.get('bar')
      }

      var f = new Foo()
      f.set('bar', 'bar')
      assert.equal(typeof f.foo, 'function')
      assert.equal(f.foo(), 'bar')
      assert.equal(f.get('foobar'), 'foobar')
    })
  })
})
