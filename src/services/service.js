import { api } from './common.js';

export async function getServices(url = null) {

    try {
        const res = await api.get(url ?? '/api/services');
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}

const config = {
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json'
    }
};


export async function createService(service) {

    try {
        const res = await api.post('/api/services', service);
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}

export async function showService(serviceId) {
    try {
        const res = await api.get(`/api/services/${serviceId}`);
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
}

export async function updateService(service) {

    try {
        const res = await api.put(`/api/services/${service.id}`, service);
        return res.data;
    }

    catch (e) {
        console.warn(e);
    }
}
