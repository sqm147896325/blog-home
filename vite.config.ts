import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
 
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  build: {
    outDir: "dist",
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/style/index.less";'
      }
    }
  },
  server: {
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器打开
    port: 3000, // 端口号
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "", // 后台接口
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: [],
  },
});