<template>
    <h2>
        Seguimiento de vehiculos
    </h2>
    <cDivider></cDivider>
    <div class="section">
        <div v-if="sidebar" class="sidebar">
            <h3>Seleccione Vehiculo</h3>
            <DropDown v-model="selectedVehicle" :options="vehicle" optionLabel="name"
                placeholder="Seleccione el vehiculo" class="w-full md:w-14rem" />
            <SelectedButtom size="small" v-model="value" :options="options" aria-labelledby="basic" />
        </div>
        <!--
            <cDivider layout="vertical"></cDivider>
        -->
        <div class="contend">
            <iframe src="http://localhost:7006/#/devices/5413999,5432377" width="100%" height="90%" style="border:0;"
                loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sidebar: boolean = false;

const selectedVehicle = ref();
const vehicle = ref([
    { name: 'Vehiculo 1', code: '1' },
    { name: 'Vehiculo 2', code: '2' },
    { name: 'Vehiculo 3', code: '3' },
]);


const value = ref('One-Way');
const options = ref(['Ayer', 'Hoy', 'Semana', 'Mes']);

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
    padding: 15px 5px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.contend {
    width: 100%;
    height: 100%;
}
</style>
