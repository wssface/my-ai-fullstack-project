import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router';
import '@/style/reset.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // 引入element-plus样式
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn'; // 导入中文语言包

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app');
