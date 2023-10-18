import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
export async function getXSRFCookie() {
    try {
        await api.get("/sanctum/csrf-cookie");
    }

    catch (e) {
        console.warn(e);
    }
}