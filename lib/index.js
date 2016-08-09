const replace = require('replacestream')
const list = require('promise-modules-list')
const combine = require('stream-combiner2')

let returned = []
let returnedF = []
let exported = []
let exportedF = []
let polyfilled = []
let polyfilledF = []

module.exports = function pExterm({ feature } = {}) {
  init()
  let r = returned
  let e = exported
  let p = polyfilled
  if (feature) {
    r = r.concat(returnedF)
    e = e.concat(exportedF)
    p = p.concat(polyfilledF)
  }
  r = new RegExp(`require\\(\\s*(['"\`])(?:${escr(r)})\\1\\s*\\)`, 'g')
  e = new RegExp(`require\\(\\s*(['"\`])(?:${escr(e)})\\1\\s*\\).Promise`, 'g')
  p = new RegExp(`require\\(\\s*(['"\`])(?:${escr(p)})\\1\\s*\\)`, 'g')

  return combine([
    replace(r, 'Promise'),
    replace(e, 'Promise'),
    replace(p, '')
  ])
}

function escr(arr) {
  return arr.join('|')
}

function init() {
  if (returned.length) {
    return
  }
  let keys = Object.keys(list)
  for (let key of keys) {
    let tags = new Set(list[key])

    if (!(tags.has('native') || tags.has('aplus'))) {
      continue
    }

    let f = tags.has('feature')

    if (tags.has('return')) {
      (f ? returnedF : returned).push(key)
    }
    else if (tags.has('export')) {
      (f ? exportedF : exported).push(key)
    }
    else if (tags.has('polyfill')) {
      (f ? polyfilledF : polyfilled).push(key)
    }
  }
}
