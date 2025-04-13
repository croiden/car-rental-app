import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import istanbul from 'vite-plugin-istanbul'

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react(),
      tsconfigPaths(),
      istanbul({
         include: 'src/**/*.{js,ts,jsx,tsx}',
         exclude: ['node_modules', 'tests/'],
         extension: ['.js', '.ts', '.jsx', '.tsx'],
         cypress: false,
         requireEnv: false,
      }),
   ],
})
