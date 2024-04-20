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


router.beforeEach(async (to, from) => {
    const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

    if(requiresAuth) {
        const user = localStorage.getItem('user');

        if(!user) {
            return { name: 'login', }
        }

        if(to.name === 'login') {
            console.log(to);
            return {name: 'home'};
        }
    }
});

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
