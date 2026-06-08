import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/apex-platform/',
  build: {
    rollupOptions: {
      input: {
        mobile: resolve(__dirname, 'mobile-index.html'),
      },
    },
  },
  server: {
    open: '/apex-platform/mobile-index.html',
  },
})
