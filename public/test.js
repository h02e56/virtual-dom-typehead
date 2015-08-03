var Typehead = require('../main')

var opt = {
  url: 'https://api.github.com/search/users?q=',
  wrapper: document.querySelector('#wrapper')
}

Typehead(opt)
