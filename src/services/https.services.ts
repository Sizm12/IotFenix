/* eslint-disable no-useless-catch */
import axios from 'axios';
import { tokenService } from '@/services/token.services'

const token = 'fSPwrl2xrIy1g3BYl2m2cACUpbS7YOS1uvnKGg7VMtLRlcFw2So2gOMvPvsB98su';
let userData = null;

tokenService.GetToken().then(data => {
    userData = data,
    console.log("Servicio", data);
    
}).catch(error => {
    console.error('Error al obtener el Dato', error)
})

const api_url = axios.create({
    baseURL: 'https://flespi.io/gw/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `FlespiToken ${token}`
    },
});

const user_id = sessionStorage.getItem('user_id')

const odoo_api = axios.create({
    baseURL: 'http://62.72.24.91:8069/',
    headers: {
        'Content-Type': 'application/json',
    },

})


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
    },
    async getTelemetry(ruta, params = {}) {
        // eslint-disable-next-line no-useless-catch
        try {
            if (Object.keys(params).length > 0) {
                const queryString = `data=${encodeURIComponent(JSON.stringify(params))}`;
                console.log('Ruta: ', `${ruta}?${queryString}`);

                const response = await api_url.get(`${ruta}?${queryString}`);
                return response.data.result;
            } else {
                const response = await api_url.get(ruta);
                return response.data.result;
            }
        } catch (error) {
            throw error;
        }
    },
    async post(ruta, data = {}) {
        // eslint-disable-next-line no-useless-catch
        try {
            //const response = await api_url.post(`${ruta}?${new URLSearchParams(params)}`);
            //const response = await api_url.post(ruta);
            const queryString = encodeURIComponent(JSON.stringify(data));
            const response = await api_url.post(`${ruta}?data=${queryString}`);
            return response.data.result;
        } catch (error) {
            throw error;
        }
    },

    async Login(ruta, login, password) {
        try {
            const response = await odoo_api.post(`${ruta}?login=${login}&password=${password}`)
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Vehiculo
    async CreateVehicule(ruta: string, data={}) {
        try {           
            const response = await odoo_api.post(`${ruta}?model_id=${data.modelo}&driver_id=${data.conductor}&license_plate=${data.matricula}&device_id=${data.dispositivo}&vin=${data.vin}&id=${user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetVehicule(ruta: string) {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
                console.log("Data",userData);
            }
               
            const response = await odoo_api.get(`${ruta}?id=${userData.user_id}`)   
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Modelos de Vehiculo
    async GetModels() {
        try {
            const response = await odoo_api.get(`getModel?id=${user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetModelList() {
        try {
            const response = await odoo_api.get(`getModelwithFormat?id=${user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Contactos
    async GetDriverList()
    {
        try {
            const response = await odoo_api.get(`getContactList?id=${user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetDrivers()
    {
        try {
            const response = await odoo_api.get(`getContact?id=${user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Contactos
    async GetDeviceList()
    {
        try {
            const response = await odoo_api.get(`getDevicewithFormat?id=${user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async GetDevices()
    {
        try {
            const response = await odoo_api.get(`getDevice?id=${user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}