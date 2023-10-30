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