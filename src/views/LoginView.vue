<script setup lang="ts">
import LoaderCar from '@/components/LoaderCar.vue';
import { httpService } from '@/services/https.services';
import { tokenService } from '@/services/token.services'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {useStore} from 'vuex'

const value = ref(null);
const value2 = ref(null);

const loader = ref(false);
const router = useRouter();
const store = useStore();

const Login = async () => {

    const login = value.value;
    const password = value2.value;

    const response = await httpService.Login(`login`, login, password)
    localStorage.setItem('token', response)
    
    if(response)
    {
        tokenService.SetToken(store);
        showLoader();
    }
}

const showLoader = () => {

    loader.value = true;
    setTimeout(() => {
        loader.value = false;
        router.push('/Dashboard/General')
    }, 3000);

};

</script>
<template>
    <div class="cont1">
        <cCard style="z-index: 30;">
            <template #title> Inicia sesión <cDivider></cDivider> </template>
            <template #content>
                <span class="p-float-label">
                    <InputText id="username" v-model="value" />
                    <label for="username">Nombre de usuario</label>
                </span>
                <br>
                <br>
                <span class="p-float-label">
                    <cPassword v-model="value2" :feedback="false" inputId="password" toggleMask />
                    <label for="password">Contraseña</label>
                </span>
                <br>
                <div class="text">
                    Olvido su contrseña?
                </div>
                <br>
                <CustomButton label="Iniciar" @click="Login()" routerLink='/Dashboard/General'
                    routerLinkActive="router-link-active" />
            </template>
        </cCard>
    </div>
    <LoaderCar v-if="loader"></LoaderCar>
</template>

<style scoped>
.cont1 {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background: url(../assets/bg2.webp);
    background-size: cover;
}

.cont1::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(28, 34, 48, 0.6);
    /* color y opacidad de la capa (en este caso, negro con 50% de opacidad) */
}

.p-button {
    width: 100%;
}

.p-inputtext {
    width: 100%
}

.text {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: #34d399
}
</style>