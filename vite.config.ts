import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v2': {
        target: 'https://dapi.kakao.com',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/api': {
        target: 'http://3.35.8.33:3000',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/uploads': {
        target: 'http://3.35.8.33:3000',
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '/gpt': {
        target: 'http://54.180.126.168:5003',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
})
