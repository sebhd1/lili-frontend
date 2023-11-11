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

export async function createOrder(order) {
    try {
        const res = await api.post('/api/orders', order);
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}

export async function showOrder(orderId) {
    try {
        const res = await api.get(`/api/orders/${orderId}`);
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}

export async function updateOrder(order) {
    try {
        const res = await api.put(`/api/orders/${order.id}`, order);
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}