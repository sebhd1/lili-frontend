import Login from './components/pages/Login.vue';
import Service from './components/pages/Service.vue';
import Home from './components/pages/Home.vue';

export default [
    { path: '/', component: Home, name: 'home'},
    {path: '/login', component: Login, name: 'login' },
    {path:'/services', component: Service, name: 'services.index'},
]