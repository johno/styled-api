'use strict'

const {
  map,
  pipe,
  xprod,
  unfold,
  unnest,
  reduce,
  concat,
  mergeAll
} = require('ramda')

const {
  util,
  theme
} = require('styled-system')

const PROP_MAP = {
  bg: 'colors',
  color: 'colors',
  backgroundColor: 'colors',
  borderRadius: 'radii',
  borderColor: 'colors',
  m: 'space',
  mt: 'space',
  mr: 'space',
  ml: 'space',
  mb: 'space',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginLeft: 'space',
  marginBottom: 'space',
  p: 'space',
  pt: 'space',
  pr: 'space',
  pl: 'space',
  pb: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingLeft: 'space',
  paddingBottom: 'space',
  boxShadow: 'shadows',
  f: 'fontSizes',
  fontSize: 'fontSizes',
  measure: 'measures',
  lh: 'lineHeights',
  lineHeight: 'lineHeights'
}

const empty = (a = []) => a.length === 0
const unfoldScale = scale => unfold(i => i < scale.length ? [i, i + 1] : false, 0)
const err = (value, name) => {
  throw new Error(`styled-api cannot accept ${value} for ${name}`)
}

module.exports.propTypes = (api, theme) =>
  Object
    .keys(PROP_MAP)
    .reduce((acc, k) => {
      const values = Array.isArray(api[k]) ? api[k] : theme[PROP_MAP[k] || k] || []

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
  const parsedApi = reduce((acc, k) => {
    if (Array.isArray(api[k])) {
      return acc.concat([api[k].map(v => ({ [k]: v }))])
    }

    const key = Array.isArray(api[k]) ? api[k] : PROP_MAP[k] || k

    let val = api[key] || theme[key]

    if (typeof theme[key] === 'object') {
      val = Object.keys(theme[key])
    } else {
      const scale = theme[key]

      val = unfoldScale(scale)
    }

    return acc.concat([val.map(v => ({ [k]: v }))])
  }, [], Object.keys(api))


  const xproduct = reduce(pipe(xprod, map(unnest)), [[]])

  return map(mergeAll, xproduct(parsedApi))
}
