import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { store, key } from './store';
import router from "./router";
import 'element-plus/lib/theme-chalk/index.css';
import './style/index.less'; // 这里引入是为了覆盖样式，vite.config.ts里引入是为了使用全局变量
import SvgIcon from '@/assets/icons/index.vue'// svg组件
import App from './App.vue';

const app = createApp(App)
app.component('svg-icon', SvgIcon)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(store, key)
app.use(router)
app.mount('#app')