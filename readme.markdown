# virtual-dom-typehead

Inspired by
[virtual-dom](https://npmjs.com/package/virtual-dom)
[virtual-dom-universal-starter](https://github.com/substack/virtual-dom-universal-starter)
[gist](https://gist.github.com/Raynos/8414846)
and more..

using:
* [virtual-dom](git://github.com/Matt-Esch/virtual-dom.git)
* [main-loop](https://npmjs.com/package/main-loop) With it the virtual-dom patch() is fired with new state you pass to it(calculating diff)
* [dom-delegator](https://github.com/Raynos/dom-delegator) set the parent listener element and set if you want bubble up or not
* [debounce](git://github.com/component/debounce) pospone fn until some time pass
* [fetch](https://github.com/matthew-andrews/isomorphic-fetch.git) for node and the browser
* [standard](https://www.npmjs.com/package/standard) code linting
* [browserify](http://browserify.org)/[watchify](https://npmjs.com/package/watchify)
* [npm run scripts](http://substack.net/task_automation_with_npm_run)

After use twitter [typehead.js](https://github.com/twitter/typeahead.js/) and take a look on all this virtual dom stuff(react, etc) I want something to practice.

[demo](http://h02e56.com/virtual-dom-typehead/)

TODO:
Show selected suggestion inside input with some transparent text
Set max number of suggestions we show
Check debounce, and what to do long list

# quick start

```
$ npm install
$ npm run dev

```

# browser code

```js

var Typehead = require('typehead')
var opt = {
  url: 'https://api.github.com/search/users?q=',//your url
  wrapper: document.querySelector('#wrapper')//existing dom el
}
Typehead(opt)

```

# license

free
