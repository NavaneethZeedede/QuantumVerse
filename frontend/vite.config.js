import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        basicSsl()
    ],
    server: {
        https: true,
        host: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000', // Explicit IPv4 to avoid localhost ::1 resolution issues
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
})
