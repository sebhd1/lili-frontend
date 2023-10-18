import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import './style.css'
import App from './App.vue'
import routes from './router.js';

axios.defaults.withCredentials = true;

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
