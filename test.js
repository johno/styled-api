const test = require('ava')
const styled = require('./')

const theme = require('./fixture.json')

const {
  xProduct,
  propTypes
} = require('./')

const api = {
  borderRadius: true,
  color: true,
  bg: ['purple', 'red', 'yellow']
}

test('xProduct returns all possible combinations', t => {
  const result = xProduct(api, theme)

  t.snapshot(result)
})

test('returns propType validations that raises on invalid values', t => {
  const result = propTypes(api, theme)

  t.throws(() => result.borderRadius(123))
})

test('returns propType validations that does not raise on valid values', t => {
  const result = propTypes(api, theme)

  t.notThrows(() => result.borderRadius(4))
})
