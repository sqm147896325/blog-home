import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvg } from './src/assets/icons/index'
import path from 'path';
import { loadEnv } from 'vite';
import viteBuild from "@madder/vite-build";
 
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      // svg 引入
      createSvg('./src/assets/icons/svg/'),
      viteBuild()
    ],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
    },
    build: {
      outDir: 'dist',
    },
    css: {
      modules: false,
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/style/index.less";'
        }
      }
    },
    server: {
      open: false, // 是否自动在浏览器打开
      port: 3000, // 端口号
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_CERT_CLIENT_BASE_API, // 后台接口
          changeOrigin: true,
          secure: false, // 如果是https接口，需要配置这个参数
          ws: true, //websocket支持
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // 引入第三方的配置
    optimizeDeps: {
      include: [],
    },
  });
}