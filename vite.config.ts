import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      // Intercepts any call starting with /api
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        // This maps 'localhost:5173/api/file.php' 
        // to 'localhost/Rental Car Website/api/file.php'
        rewrite: (path) => path.replace(/^\/api/, '/Rental Car Website/api'),
      },
    },
  },
})