import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { store, key } from './store';
import router from "./router";
import 'element-plus/lib/theme-chalk/index.css';
import './style/index.less';
import App from './App.vue';

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(store, key)
app.use(router)
app.mount('#app')