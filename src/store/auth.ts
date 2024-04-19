
import { createStore } from 'vuex';

interface UserData {
    user_id: number;
    rol: string;
    exp: number;
}

interface AuthState {
    userData: UserData | null;
}

export default createStore<AuthState>({
    state() {
        return {
            userData: null
        };
    },
    mutations: {
        setUserData(state, userData: UserData) {
            state.userData = userData;
        }
    },
    actions: {
        setUserData({ commit }, userData: UserData) {
            commit('setUserData', userData);
        }
    },
    getters: {
        userData: state => state.userData
    }
});
