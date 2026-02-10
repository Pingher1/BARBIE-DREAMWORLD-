
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './', // Vital for GH Pages deployment
    server: {
        port: 4000,
        strictPort: true, // If 4000 is taken, do NOT switch. Crash instead.
    }
})
