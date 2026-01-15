import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Exclude pocketbase to avoid Vite trying to optimize the binary file
    exclude: []
  },
  server: {
    fs: {
      // Prevent serving files outside of the workspace
      strict: true
    }
  }
})
