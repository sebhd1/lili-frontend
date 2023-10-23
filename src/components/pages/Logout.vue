<script setup>

    import { useAppStore } from '../../stores/app.js';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const store = useAppStore();

    async function performLogout() {
        await store.doLogout();

        await router.push({
            name: 'login',
        })
    }
</script>

<template>
    <h2>Sei sicuro di voler uscire?</h2>
    <button type="button" @click.prevent="async () => await performLogout()">Logout</button>
</template>

<style scoped>

</style>