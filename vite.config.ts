import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig((
  {mode}
)=>{
  const env = loadEnv(mode, process.cwd(),'')
  return {
    plugins: [vue()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    define:{
      'process.env': {
        'API_URL': env.API_URL,}
    }
  }
})
