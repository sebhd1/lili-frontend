import Login from './components/pages/Login.vue';
import Service from './components/pages/Service.vue';
import Home from './components/pages/Home.vue';
import Logout from './components/pages/Logout.vue';

export default [
    { path: '/', component: Home, name: 'home'},
    {path: '/login', component: Login, name: 'login' },
    {path: '/logout', component: Logout, name: 'logout'},
    {path:'/services', component: Service, name: 'services.index'},
]