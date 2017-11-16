import React from 'react'

import {
  ThemeProvider
} from 'glamorous'

import {
  H1,
  Font
} from './library'

import theme from './theme'

import ProfileCards from './ProfileCards'

export default () =>
  <ThemeProvider theme={theme}>
    <Font>
      <H1>
        Styled Api
      </H1>

      <ProfileCards />
    </Font>
  </ThemeProvider>
