import {
    createSystem,
    defaultConfig,
    defineConfig,
  } from "@chakra-ui/react"
  
  const config = defineConfig({
    theme: {
      tokens: {
        colors: {},
      },
    },
  })
  
export default createSystem(defaultConfig, config)