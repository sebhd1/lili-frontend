import Login from './components/pages/Login.vue';
import Home from './components/pages/Home.vue';
import Logout from './components/pages/Logout.vue';

import ServiceIndex from './components/services/ServiceIndex.vue';
import ServiceForm from './components/services/ServiceForm.vue';
import OrderIndex from './components/Orders/OrderIndex.vue';
import ClientIndex from './components/Clients/ClientIndex.vue';
import ClientForm from './components/Clients/ClientForm.vue';
import View from './components/pages/View.vue';
import OrderForm from './components/Orders/OrderForm.vue';


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
                path: '',
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

    { path: '/orders', component: View, children: [
            {
                path: '',
                component: OrderIndex,
                name: 'orders.index'
            },
            {
                path: 'create',
                component: OrderForm,
                name: 'orders.create',
            },

            {
                path: ':id',
                component: '',
                name: 'orders.show',
            },

            {
                path: ':id/edit',
                component: OrderForm,
                name: 'orders.edit',
                props: true,
            },

        ],
        meta: {requiresAuth: true,}
     },

    { path: '/clients', component: View, children: [
            {
                path: '',
                component: ClientIndex,
                name: 'clients.index'
            },
            {
                path: 'create',
                component: ClientForm,
                name: 'clients.create',
            },

            {
                path: ':id',
                component: '',
                name: 'clients.show',
            },

            {
                path: ':id/edit',
                component: ClientForm,
                name: 'clients.edit',
                props: true,
            },

        ],
        meta: {requiresAuth: true,}
    },

]