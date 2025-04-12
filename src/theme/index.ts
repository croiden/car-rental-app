import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
   globalCss: {
      'html, body': {
         backgroundColor: 'gray.100',
      },
   },
   theme: {
      breakpoints: {
         sm: '320px',
         md: '768px',
         lg: '960px',
         xl: '1200px',
      },
   },
   //     // tokens: {
   //     //    colors: {},
   //     // },
   //  },
})

export default createSystem(defaultConfig, config)
