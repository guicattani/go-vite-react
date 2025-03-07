import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
dotenv.config({path: '../.env'})

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: process.env.USE_POLLING === 'true', //needed for WSL env
    },
  },
})
