import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'

import './i18n'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Provider>
         <App />
         <Toaster />
      </Provider>
   </StrictMode>,
)
