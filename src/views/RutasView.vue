<template>
    <h1>
        Rutas View
    </h1>
    <cDivider></cDivider>
    <div class="section">
        <div class="sidebar">
            <DropDown v-model="selectedVehicle" :options="vehicle" optionLabel="name" placeholder="Seleccione el vehiculo" class="w-full md:w-14rem" />
        </div>
        <!--
            <cDivider layout="vertical"></cDivider>
        -->
        <div class="contend">

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

const value = ref(null);
const options = ref([
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3 }
]);
</script>

<style scoped>
.section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.sidebar {
    width: 300px;
    height: 100%;
    background-color: #232A3A;
    padding: 15px  5px;
}

.contend {
    width: 100%;
    height: 100%;
}
</style>
