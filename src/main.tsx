import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import './i18n'
import theme from './theme'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ChakraProvider value={theme}>
         <App />
      </ChakraProvider>
   </StrictMode>,
)
