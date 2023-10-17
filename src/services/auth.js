import axios from 'axios';
import { getXSRFCookie } from './common.js';

export async function login(data) {
    try {
        await getXSRFCookie();

        const res = await axios.post("/login", data);

        if(res.status >= 200 && res.status < 300) {
            const userRes =  await axios.get("/api/user");
            if(userRes.status !== 200) {
                return null;
            }
            return userRes.data;
        }
        return null;
    }

    catch (e) {
        console.warn(e);
    }
}

export async function logout() {
    try {
        await axios.post("/logout");
    }
    catch (e)
    {
        console.warn(e);
    }
}