<script setup>
    import { useAppStore } from '../stores/app.js';

    const store = useAppStore();

</script>

<template>
    <nav>
        <div v-if="store.userLoggedIn">
            <RouterLink  :to="{name: 'services.index'}">Servizi</RouterLink>
            <RouterLink :to="{name: 'logout'}">Logout</RouterLink>
        </div>
        <div v-else>
            <RouterLink :to="{name: 'login'}">Login</RouterLink>
        </div>
    </nav>

</template>

<style scoped>

</style>