import axios from 'axios';

const token = 'i9OjixYozzHImqyv7CkOH5mgijWXfjjngYuojjAHG5fSmDbj3kWyd6Fmfp7jwhuD';

const api_url = axios.create({
    baseURL: 'https://flespi.io/gw/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `FlespiToken ${token}`
    },
});

export const httpService = {
    async get(ruta, params = {}) {
        // eslint-disable-next-line no-useless-catch
        try {
            if (Object.keys(params).length > 0) {
                const response = await api_url.get(ruta, { params });
                return response.data.result;
            } else {
                const response = await api_url.get(ruta);
                return response.data.result;
            }
        } catch (error) {
            throw error;
        }
    }
}