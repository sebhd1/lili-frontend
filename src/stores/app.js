import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';
import { login } from '../services/auth.js';

export const useAppStore = defineStore('app', () => {
    const user = reactive({});

    const userLoggedIn = computed(() => {
        return (user?.id ?? null) !== null;
    });

    async function doLogin(form) {

        if(userLoggedIn.value) {
            throw new Error("User already logged in!")
        }

        const data = await login(form);

        if(data === null) {
            throw new Error("Authentication failed!")
        }
        Object.assign(user, data);
    }

    return {user, userLoggedIn, doLogin };
});