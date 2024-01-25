<template>
    <h1>
        Rutas View
    </h1>
    <cDivider></cDivider>
    <div class="section">
        <div class="sidebar">
            <h3>Seleccione Vehiculo</h3>
            <DropDown v-model="selectedVehicle" :options="vehicle" optionLabel="name" placeholder="Seleccione el vehiculo" class="w-full md:w-14rem" />
            <SelectedButtom size="small" v-model="value" :options="options" aria-labelledby="basic" />
        </div>
        <!--
            <cDivider layout="vertical"></cDivider>
        -->
        <div class="contend">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15615.355143606817!2d-86.15500415156954!3d11.91630540837058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f740459e2eeaf4b%3A0xcfba68d80c1c3d4a!2sMasatepe!5e0!3m2!1ses!2sni!4v1706207853372!5m2!1ses!2sni" width="100%" height="100%" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedVehicle = ref();
const vehicle = ref([
    { name: 'Vehiculo 1', code: '1' },
    { name: 'Vehiculo 2', code: '2' },
    { name: 'Vehiculo 3', code: '3' },
]);


const value = ref('One-Way');
const options = ref(['Ayer','Hoy', 'Semana','Mes']);

</script>

<style scoped>
.section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.sidebar {
    width: 650px;
    height: 100%;
    background-color: #232A3A;
    padding: 15px  5px;
    display: flex;
    flex-direction:column;
    gap:15px;
}

.contend {
    width: 100%;
    height: 100%;
}
</style>
