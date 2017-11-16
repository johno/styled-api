'use strict'

const {
  map,
  pipe,
  xprod,
  unnest,
  reduce,
  concat,
  mergeAll
} = require('ramda')

const {
  util,
  theme
} = require('styled-system')

const empty = (a = []) => a.length === 0
const err = (value, name) => {
  throw new Error(`styled-lift cannot accept ${value} for ${name}`)
}

const PROP_MAP = {
  backgroundColor: 'color',
  bg: 'color',
  margin: 'space',
  padding: 'space'
}

module.exports.propTypes = (api, theme) =>
  Object
    .keys(theme)
    .reduce((acc, k) => {
      const values = Array.isArray(api[k]) ? api[k] : theme[k]

      if (empty(values)) {
        return Object.assign({}, acc, {
          [k]: (value, propName) => {
            util.arr(value).forEach(v => {
              if (values.includes(v)) {
                err(v, propName)
              }
            })
          }
        })
      } else {
        return Object.assign({}, acc, {
          [k]: (value, propName) => {
            util.arr(value).forEach(v => {
              if (!values.includes(v)) {
                err(v, propName)
              }
            })
          }
        })
      }
    }, {})

module.exports.xProduct = (api, theme) => {
  console.log(api)
  console.log(theme)

  const xproduct = reduce(pipe(xprod, map(unnest)), [[]])
  const valueByProp = object => prop => map(v => ({ [prop]: v }), object[prop])

  return map(mergeAll, xproduct(map(valueByProp(theme), Object.keys(api))))
}
