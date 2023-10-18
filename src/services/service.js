import axios from 'axios';

export async function getServices(url = null) {

    const baseURL = axios.defaults.baseURL;

    if(url && url.match(/^(http[s]?:)?\/\//i)) {
        axios.defaults.baseURL = '';
    }

    try {
        const res = await axios.get(url ?? '/api/services');
        return res.data;
    }
    catch (e) {
        console.warn(e);
    }
    finally {
        if(!axios.defaults.baseURL) {
            axios.defaults.baseURL = baseURL;
        }
    }
}
