import { createApp } from 'vue';
import { store, key } from './store';
import router from "./router";
import './style/index.less'; // 这里引入是为了覆盖样式，vite.config.ts里引入是为了使用全局变量
import SvgIcon from '@/assets/icons/index.vue'// svg组件
import App from './App.vue';

const app = createApp(App)
app.component('svg-icon', SvgIcon)
app.use(store, key)
app.use(router)
app.mount('#app')