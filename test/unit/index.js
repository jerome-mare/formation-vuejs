import Vue from 'vue'

Vue.config.productionTip = false
Vue.config.devtools = false

// Polyfill fn.bind() for PhantomJS
// Polyfill ES6 Promise for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind')
require('phantomjs-polyfill-find-index')
require('es6-promise').polyfill()

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
