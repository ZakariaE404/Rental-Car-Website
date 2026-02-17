import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Crucial for GitHub Pages
  base: "/Rental-Car-Website/",

  plugins: [react()],

  resolve: {
    alias: {
      // Since your files are in the root, @ should point to root
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    // Ensures Vite knows index.html is the entry point in the root
    outDir: 'dist',
  }
});