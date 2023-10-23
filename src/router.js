import Login from './components/pages/Login.vue';
import Home from './components/pages/Home.vue';
import Logout from './components/pages/Logout.vue';
import View from './components/pages/View.vue';
import ServiceIndex from './components/services/ServiceIndex.vue';
import ServiceForm from './components/services/ServiceForm.vue';

export default [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    {
        path: '/logout',
        component: Logout,
        name: 'logout',
        meta: {requiresAuth: true,},
    },
    {
        path: '/services', component: View, children: [
            {
                path:'',
                component: ServiceIndex,
                name: 'services.index'
            },
            {
                path: 'create',
                component: ServiceForm,
                name: 'services.create',
            },

            {
                path: ':id',
                component: '',
                name: 'services.show',
            },

            {
                path: ':id/edit',
                component: ServiceForm,
                name: 'services.edit',
                props: true,
            },

        ],
        meta: {requiresAuth: true,}
    },
]