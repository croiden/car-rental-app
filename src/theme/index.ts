import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
   globalCss: {
      'html, body': {
         colorPalette: 'teal', // Change this to any color palette you prefer
         _light: {
            backgroundColor: 'gray.100',
         },
         _dark: {
            backgroundColor: 'gray.900',
         },
      },
   },
   theme: {
      breakpoints: {
         xl: '70em', // 1120px
      },
   },
})

export const system = createSystem(defaultConfig, config)
