import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useAuthStore } from './store/auth.pinia';

const pinia = createPinia();

const app = createApp(App)
  .use(router)
  .use(pinia);

const authStore = useAuthStore();
await authStore.initAuth();

app.mount('#app');
