import React from 'react'

import {
  Flex,
  Box
} from 'reflexbox'

import {
  H1,
  ProfileCard
} from './library'

import {
  xProduct
} from '../'

import theme from './theme'

const PROFILE = {
  name: 'Brent Jackson',
  handle: '@jxnblk',
  description: 'Trying to build better tools for designers and developers. Based in Brooklyn, NY.'
}

const boxShadowTheme = {
  boxShadows: true
}

const nameTheme = {
  fontSizes: true
}

export default () =>
  <Box>
    <H1>Box Shadow</H1>

    <Flex
      wrap
      justify='space-between'
      children={xProduct(boxShadowTheme, theme).map(styles => {
        return (
          <Box
            my={3}
            w={[1/2, .32, .32]}
          >
            <ProfileCard
              {...PROFILE}
              shadowBox={styles}
            />
          </Box>
        )
      })}
    />

    <H1>Heading Font Sizes</H1>
    <Flex
      wrap
      justify='space-between'
      children={xProduct(nameTheme, theme).map(styles => {
        return (
          <Box
            my={3}
            w={[1/2, .32, .32]}
          >
            <ProfileCard
              {...PROFILE}
              nameProps={{
                fontSize: styles.fontSizes
              }}
            />
          </Box>
        )
      })}
    />
  </Box>
