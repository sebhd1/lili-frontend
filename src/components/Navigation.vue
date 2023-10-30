<script setup>
    import { useAppStore } from '../stores/app.js';

    const store = useAppStore();

</script>

<template>
    <nav>
        <div v-if="store.userLoggedIn">
            <RouterLink :to="{name: 'services.index'}">Servizi</RouterLink>
            <RouterLink :to="{name: 'clients.index'}">Clienti</RouterLink>
            <RouterLink :to="{name: 'orders.index'}">Ordini</RouterLink>
            <RouterLink :to="{name: 'logout'}">Logout</RouterLink>
        </div>
        <div v-else>
            <RouterLink :to="{name: 'login'}">Login</RouterLink>
        </div>
    </nav>

</template>

<style scoped>

    nav {
         & div {
             display: flex;
             justify-content: center;
             align-items: center;
             gap: 3rem;
             flex-wrap: wrap;

             & a {
                 border:2px solid white;
                 color: white;
                 border-radius: 20px;
                 padding: 0.50rem;
             }

             & a:hover, a:focus {
                 background: whitesmoke;
                 color: black;
                 font-weight: bold;
                 border: none;
             }
         }

        margin-bottom: 3rem;
    }

</style>