import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    'process.env.API_URL': JSON.stringify('http://localhost:4000'), 
  },
});
