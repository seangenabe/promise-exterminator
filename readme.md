# promise-exterminator

[![Greenkeeper badge](https://badges.greenkeeper.io/seangenabe/promise-exterminator.svg)](https://greenkeeper.io/)

Remove Promise polyfill requires from your Javascript source code.

[![npm](https://img.shields.io/npm/v/promise-exterminator.svg?style=flat-square)](https://www.npmjs.com/package/promise-exterminator)
[![Build Status](https://img.shields.io/travis/seangenabe/promise-exterminator/master.svg?style=flat-square)](https://travis-ci.org/seangenabe/promise-exterminator)
[![Dependency Status](https://img.shields.io/david/seangenabe/promise-exterminator.svg?style=flat-square)](https://david-dm.org/seangenabe/promise-exterminator)
[![devDependency Status](https://img.shields.io/david/dev/seangenabe/promise-exterminator.svg?style=flat-square)](https://david-dm.org/seangenabe/promise-exterminator#info=devDependencies)
[![node](https://img.shields.io/node/v/promise-exterminator.svg?style=flat-square)](https://nodejs.org/en/download/)

## Usage

```
const promiseExterminator = require('promise-exterminator')
```

### promiseExterminator([opts])

Returns a transform stream that replaces `require` statements to Promise polyfills to native Promise. We're assuming the environment the transform source code will run in already has Promise support.

* `opts.feature` - Boolean - **Use only if you are sure what you are doing.** Include packages, with features in addition to native Promise capabilities, such as Q and Bluebird. This will only work out if the respective dependents of the packages don't use those additional features.

## Browserify?

Sure.

## License

MIT
