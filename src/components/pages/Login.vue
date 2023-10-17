<script setup>
    import { reactive } from 'vue';
    import { useAppStore } from '../../stores/app.js';

    const store = useAppStore();

    const form = reactive({
        email: null,
        password: null,
    });

</script>

<template>
    <form @submit.prevent="async () => await store.doLogin(form)">
        <div>
            <label for="email">Email:</label>
            <input
                v-model.trim="form.email"
                id="email"
                placeholder="example@gmail.com"
                type="email"
                required
            >
        </div>

        <div>
            <label for="password">Password:</label>
            <input
                v-model="form.password"
                id="password"
                type="password"
                required
            >
        </div>

        <button type="submit">Login</button>
    </form>
</template>

<style scoped>
    form {
        border: 2px solid white;
        padding: 1rem;
        border-radius: 18px;
    }
</style>