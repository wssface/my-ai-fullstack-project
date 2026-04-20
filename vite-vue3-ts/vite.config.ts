import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
       '@': path.resolve(__dirname, './src'),
       '@shared-types': fileURLToPath(new URL('./packages/shared-types', import.meta.url))
      //'@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: { //  设置端口和自动打开浏览器
    port: 3000,
    open: true,
  },
})
