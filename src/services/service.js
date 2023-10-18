import axios from 'axios';
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
