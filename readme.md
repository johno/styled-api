# styled-api [![Build Status](https://secure.travis-ci.org/johnotander/styled-api.svg?branch=master)](https://travis-ci.org/johnotander/styled-api) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Constraint based styling api based on [`styled-system`](https://github.com/jxnblk/styled-system).

### What's this?

`styled-api` seeks to allow designers and developers to expose a styling api for a component.
This is a proof of concept implementation based off of [Adam Morse](https://twitter.com/mrmrs_)'s idea.

#### Motivation

Often times a component has styles that are customizable, and styles that aren't.
Take a button for example, it might make sense to change colors, margin, padding, border radius and font size.
With `styled-api`, you can expose these as a public api, leaving all other styling private and unable to be manipulated by the component's user.

## Installation

```bash
npm install --save styled-api
```

## Usage

```javascript
const styled = require('styled-api')

const Button = styled('button')({
  padding: true, // Apply subset of theme
  fontSize: true,
  fontWeight: [400, 600],
  color: true,
  bg: true
})
```

#### Prop Types

If desired, you can add prop type validation to your styled api.
This is recommended in development environments so a descriptive error is raised when an invalid theme prop is passed.
Otherwise, invalid props are simply ignored.

```js
const {
  propTypes
} = require('styled-api')

Box.propTypes = propTypes(api, theme)
```

#### Cartesian Product

`styled-api` exposes an additional component that can document all possible combinations based on its styling api.

```js
const { xProduct } = require('styled-api')

const combinations = xProduct({
  margin: true,
  borderWidth: [0, 1, 2, 9999],
  borderStyle: ['solid', 'dotted'],
  borderColor: true
})

combinations.map(props => <Button {...props} children='Click me' />)
```

## Related

- https://github.com/jxnblk/styled-system
- https://github.com/mrmrs/component-api-talk
- https://github.com/ramda/ramda
- https://github.com/ramda/ramda/issues/2028

## Acknowledgements

Big thanks to [Cedric](https://github.com/Cedev) for working through [Cartesian Products](https://en.wikipedia.org/wiki/Cartesian_product) with me.

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
