import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['API_', 'VITE_'])
  const target = env.API_BE || env.VITE_API_BE || 'https://api-uat.vinhomes.biz.vn/hovixi/api/v1'

  return {
    plugins: [react()],
    envPrefix: ['VITE_', 'API_'],
    server: {
      proxy: {
        '/proxy-api': {
          target: target,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy-api/, ''),
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        },
      },
    },
  }
})
