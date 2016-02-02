# Express Compatible Settings Store

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status](https://travis-ci.org/wesleytodd/store-settings.svg?branch=master)](https://travis-ci.org/wesleytodd/store-settings)
[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

A stand-alone implementation of the settings portion of express.  The class that is exported can be mixed into or extended from in your application.

## Usage

```
$ npm install --save store-settings
```

```javascript
var Settings = require('store-settings');

// Create a store
var store = new Settings();

// Set values on the store
store.set('foo', 'bar');

// Get a value
store.get('foo'); // 'bar'

// Boolean values
store.enable('yep');
store.enabled('yep'); // true
store.disabled('yep'); // false

store.disable('yep');
store.disabled('yep'); // true
store.enabled('yep'); // false

// Setter methods
var store2 = new Settings({
	setters: {
		foo: function (val) {
			this.set('foobar', 'foo' + val);
		}
	}
});
store2.set('foo', 'bar');
store.get('foobar'); // 'foobar'

// Extending from
class Foo extends Settings {
	foo () {
		return this.get('foo');
	}
}

var foo = new Foo();
foo.set('foo', 'bar');
foo.foo(); // 'bar'
```

[npm-image]: https://img.shields.io/npm/v/store-settings.svg
[npm-url]: https://npmjs.org/package/store-settings
[downloads-image]: https://img.shields.io/npm/dm/store-settings.svg
[downloads-url]: https://npmjs.org/package/store-settings
