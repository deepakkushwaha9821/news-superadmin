import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Ensures relative paths for Netlify
  build: {
    outDir: 'dist', // or 'build' if you prefer
  },
  server: {
    port: 5173, // optional: can remove if default is fine
  },
});

