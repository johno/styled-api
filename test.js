const test = require('ava')
const styled = require('./')

const {
  xProduct,
  propTypes
} = require('./')

const theme = {
  borderRadius: [0, 1, 2],
  borderStyle: ['solid', 'dotted'],
  borderWidth: [3, 4, 5, 6],
  space: [0, 2, 4, 8, 16, 32]
}

const api = {
  borderRadius: true,
  borderStyle: true,
  borderWidth: true,
  space: true
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

  t.notThrows(() => result.borderRadius(2))
})
