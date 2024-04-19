import { jwtDecode } from "jwt-decode";

export const tokenService = {
    async SetToken(store) {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decodedTokenData = jwtDecode(jwtToken);

            const userData = {
                user_id: decodedTokenData.user_id,
                rol: decodedTokenData.rol,
                exp: decodedTokenData.exp,
            };

            store.dispatch('setUserData', userData);
        }
    },

    async GetToken(){
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decodedTokenData = jwtDecode(jwtToken);       
            return decodedTokenData;
        }
    }
};