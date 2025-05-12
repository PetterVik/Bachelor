import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Hvis ikke nødvendig, kan du fjerne dette aliaset
      warning: path.resolve(__dirname, 'node_modules', 'warning', 'warning.js')
    }
  },
  optimizeDeps: {
    include: ['react-big-calendar', 'warning']
  }
})
