import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { login, logout } from '../services/auth.js';
import router from '../router.js';
import { useRouter } from 'vue-router';

function loadUserFromStorage() {
    const userJSON =  localStorage.getItem('user');

    if(!userJSON) {
        return {};
    }

    return JSON.parse(userJSON);
}

export const useAppStore = defineStore('app', () => {
    const user = ref(loadUserFromStorage());
    const enums = reactive({});

    const userLoggedIn = computed(() => {
        return (user.value?.id ?? null) !== null;
    });

    async function doLogin(form) {

        if(userLoggedIn.value) {
            throw new Error("User already logged in!")
        }

        const data = await login(form);

        if(data === null) {
            throw new Error("Authentication failed!")
        }
        user.value = data;
        localStorage.setItem('user', JSON.stringify(user));
    }

    async function doLogout() {

        if(!userLoggedIn.value) {
            return true;
        }

        await logout();

        user.value = {};
        localStorage.removeItem('user');
    }


    return {user, userLoggedIn, doLogin, doLogout, enums };
});