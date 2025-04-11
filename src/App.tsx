import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const TestCss = styled.div`
   height: 100px;
   width: 100px;
   background-color: red;
`

function App() {
   const [count, setCount] = useState(0)
   const { t } = useTranslation()

   return (
      <>
         <div>
            <a href="https://vite.dev" target="_blank">
               <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
               <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
         </div>
         <h1>Vite + React</h1>
         <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            <p>
               Edit <code>src/App.tsx</code> and save to test HMR
            </p>
         </div>
         <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
         <Box>Hello World Using Chakra UI {t('welcome')}</Box>
         <TestCss />
      </>
   )
}

export default App
