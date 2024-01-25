<script setup lang="ts" >
import { ref } from 'vue';

const value = ref(null);

</script>
<template>
    <div class="cont1">
        <cCard>
            <template #title> Inicia sesión <cDivider></cDivider> </template>
            
            <template #content>
                <span class="p-float-label">
                    <InputText id="username" v-model="value" />
                    <label for="username">Nombre de usuario</label>
                </span>
                <br>
                <br>
                <span class="p-float-label">
                    <cPassword v-model="value" :feedback="false" inputId="password" toggleMask />
                    <label for="password">Contraseña</label>
                </span>
                <br>
                <div class="text">
                    Olvido su contrseña?
                </div>
                <br>
                <CustomButton label="Iniciar" routerLink='/Dashboard/General' routerLinkActive="router-link-active"  />
            </template>
        </cCard>
    </div>
</template>


<style scoped>

.cont1 {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 100dvh;
}

.p-button {
    width: 100%;
}

.p-inputtext {
   width: 100%
}

.text {
    width:100%;
    display: flex;
    justify-content: flex-end;
    color: #34d399
}
</style>