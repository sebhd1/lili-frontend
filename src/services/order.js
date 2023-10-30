import { api } from './common.js';

export async function getOrders(url = null) {

    try {
        const res = await api.get(url ?? '/api/orders');
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}