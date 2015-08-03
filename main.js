var h = require('virtual-dom/h')
var debounce = require('debounce')
var VD = require('virtual-dom')
var main = require('main-loop')
var xtend = require('xtend')
var createElement = require('virtual-dom/create-element')
var delegator = require('dom-delegator')()

require('es6-promise').polyfill()
require('isomorphic-fetch')

var Typehead = function (opt) {
  var defaults = {}
  var options = xtend(defaults, opt)
  var state = {
    results: [],
    selected: -1
  }

  var rendered, el, debounced

  // render initial ui
  let ui = createElement(initialUI())
  options.wrapper.appendChild(ui)
  // save dom el
  el = document.querySelector('#typehead')
  // fire event listeners
  events()

  function initialUI () {
    return h('div', {id: 'search', className: 'search row'}, [
              h('input', {type: 'text', id: 'typehead', placeholder: 'search'}),
              h('section', {id: 'results'})
            ])
  }

  function events () {
    debounced = debounce(_fetch, 800)
    delegator.addGlobalEventListener('input', debounced)
    delegator.addEventListener(el, 'keydown', function (e) {
      // 40 down 38 up
      let keyCode = e.keyCode
      let selected = state.selected

      if (keyCode === 40 || keyCode === 38) handleKey(keyCode)

      function handleKey (keyCode) {
        let incremental = (keyCode === 40) ? +1 : -1
        let next = selected + incremental
        let length = document.querySelectorAll('#search li').length

        if (next < 0 && rendered) state.selected = length - 1
        else if (next < 0) state.selected = length - 1
        else if (next > length - 1) state.selected = 0
        else state.selected = next
        update()
      }
    })

    delegator.addEventListener(el, 'blur', (e) => {
      document.querySelector('#results').style.display = 'none'
    })
    delegator.addEventListener(el, 'focus', (e) => {
      document.querySelector('#results').style.display = 'block'
    })
  }

  function _fetch (e) {
    let query = e.target.value

    window.fetch(options.url + query)
      .then(response => response.json())
      .then(response => response.items.filter(user => user.login.includes(query)))
      .then(items => {
        state.results = items
        state.selected = -1
        update()
      })
      .catch(err => console.log(err))
  }

  function render (state) {
    let selected = state.selected
    let active
    let checked

    var list = state.results.map((item, i) => {
      active = false
      if (!checked) {
        if (i === selected) active = checked = true
      }

      return h('li', {
        id: item.id,
        className: (active) ? 'active' : ''
      }, item.login)
    })

    return h('section', {id: 'results', className: 'results'},
        h('ul', list)
    )
  }

  var update = function update () {
    let resultsTarget = document.querySelector('#results')
    if (rendered) rendered.update(state)
    else rendered = main(state, render, VD)
    resultsTarget.parentNode.replaceChild(rendered.target, resultsTarget)
  }
}

module.exports = Typehead
