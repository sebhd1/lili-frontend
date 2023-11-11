import { api } from './common.js';

export async function getClients(url = null) {
    try {
        const res = await api.get(url ?? '/api/clients');
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }

}

export async function createClient(client) {
    try {
        const res = await api.post('/api/clients', client);
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}

export async function showClient(clientId) {
    try {
        const res = await api.get(`/api/clients/${clientId}`);
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}

export async function updateClient(client) {
    try {
        const res = await api.put(`/api/clients/${client.id}`, client);
        return res.data;
    }

    catch (e) {
        console.warn(e);
    }
}