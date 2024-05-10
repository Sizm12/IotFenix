/* eslint-disable no-useless-catch */
import axios from 'axios';
import { tokenService } from '@/services/token.services'

const token = 'fSPwrl2xrIy1g3BYl2m2cACUpbS7YOS1uvnKGg7VMtLRlcFw2So2gOMvPvsB98su';
let userData = null;

tokenService.GetToken().then(data => {
    userData = data
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
    async CreateVehicule(ruta: string, data = {}) {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }

            const response = await odoo_api.post(`${ruta}?model_id=${data.modelo}&driver_id=${data.conductor}&license_plate=${data.matricula}&device_id=${data.dispositivo}&vin=${data.vin}&id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetVehicule(ruta: string) {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }

            const response = await odoo_api.get(`${ruta}?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetVehiculeList() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getVehiculewithFormat?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Fabricantes de Vehiculo
    async GetBrandss() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getManufacturer?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Categorias de Vehiculo
    async GetCategories() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getCategory?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Modelos de Vehiculo
    async GetModels() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getModel?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async CreateModels(ruta: string, data = {}) {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }

            const response = await odoo_api.post(`${ruta}?name=${data.name}&brand_id=${data.brand_id}&category_id=${data.category_id}&seats=${data.seats}&doors=${data.doors}&color=${data.color}&model_year=${data.model_year}&default_fuel_type=${data.default_fuel_type}&transmission=${data.transmission}&power=${data.power}&horsepower=${data.horsepower}&id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetModelList() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getModelwithFormat?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Contactos
    async GetDriverList() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getContactList?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async CreateDriver(ruta: string, data = {}) {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }

            const response = await odoo_api.post(`${ruta}?name=${data.name}&email=${data.email}&phone=${data.phone}&vat=${data.vat}&street=${data.street}&street2=${data.street2}&city=${data.city}&id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetDrivers() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getContact?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetUsers() {
        try {
            const response = await odoo_api.get(`getUser`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetRoles() {
        try {
            const response = await odoo_api.get(`getRoles`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async CreateUser(ruta: string, data = {}) {
        try {
            const response = await odoo_api.post(`${ruta}?username=${data.username}&email=${data.email}&password=${data.password}&rol_id=${data.rol_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    //Endpoint Modulo Dispositivos
    async GetDeviceList() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getDevicewithFormat?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async GetDevices() {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.get(`getDevice?id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async CreateDevices(ruta: string, data = {}) {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.post(`${ruta}?name=${data.name}&flespi_id=${data.flespi_id}&imei=${data.imei}&fecha_obtencion=${data.fecha_obtencion}&device_type=${data.device_type}&id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetTypeDeviceList() {
        try {
            const response = await odoo_api.get(`getDeviceTypewithFormat`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async GetTypeDevices() {
        try {
            const response = await odoo_api.get(`getDeviceType`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async CreateTypeDevices(ruta: string, data = {}) {
        try {
            if (!userData) {
                userData = await tokenService.GetToken();
            }
            const response = await odoo_api.post(`${ruta}?name=${data.name}&proveedor=${data.proveedor}&modelo=${data.modelo}&id=${userData.user_id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    
}