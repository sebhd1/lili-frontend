import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});
export async function getXSRFCookie() {
    try {
        await api.get("/sanctum/csrf-cookie");
    }

    catch (e) {
        console.warn(e);
    }
}

export async function getFrequency() {
    try {
        const res = await api.get("/api/shared/enums/frequency");
        return res.data.data;
    }
    catch (e) {
        console.warn(e);
    }
}

export async function getStatus() {
    try {
        const res = await api.get("/api/shared/enums/order-status");
        return res.data.data;
    }

    catch (e) {
        console.warn(e);
    }
}