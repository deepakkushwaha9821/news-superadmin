import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Must be set for Netlify
  build: {
    outDir: 'dist'
  }
})

