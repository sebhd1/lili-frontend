import axios from 'axios';

export async function getXSRFCookie() {
    try {
        await axios.get("/sanctum/csrf-cookie");
    }

    catch (e) {
        console.warn(e);
    }
}