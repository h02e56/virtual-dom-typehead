'use strict'
var browserSync = require('browser-sync')

var bs = browserSync.create()

bs.init({
  server: './public',
  files: ['./public/*.*'],
  open: false,
  online: false,
  browser: 'google chrome'
})
