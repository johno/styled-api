'use strict'

const {
  map,
  pipe,
  merge,
  xprod,
  unnest,
  reduce,
  concat
} = require('ramda')

const {
  util,
  theme
} = require('styled-system')

const empty = (a = []) => a.length === 0
const err = (value, name) => {
  throw new Error(`styled-lift cannot accept ${value} for ${name}`)
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
  const styles = Object.keys(api)

  const reduceObjectArray = arr => reduce(merge, {}, arr)
  const xproduct = reduce(pipe(xprod, map(unnest)), [[]])
  const valueByProp = object => (acc, i) => concat(acc, [
    map(v => ({ [i]: v }), object[i])
  ])

  return map(reduceObjectArray, xproduct(reduce(valueByProp(theme), [], styles)))
}
