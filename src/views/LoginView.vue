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
                    <label for="username">Username</label>
                </span>
                <br>
                <br>
                <span class="p-float-label">
                    <cPassword v-model="value" :feedback="false" inputId="password" toggleMask />
                    <label for="password">Password</label>
                </span>
                <br>
                <div class="text">
                    <p>Olvido su contrseña?</p>
                </div>
                <br>
                <CustomButton label="Submit" />
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
    height: 100vh;
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