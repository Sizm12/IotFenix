<template>
    <div class="flex">
        <h2>Mis vehiculos</h2>
        <CustomButton size="small" icon="pi pi-plus" label="Agregar vehiculo"></CustomButton>
    </div>
    <cDivider></cDivider>

    <div class="cont">
        <CardVehiculo v-for="(vehicle, index) in vehicles" :key="index" :vehicle="vehicle"/>
    </div>
</template>
  
<script setup lang="ts">
import CardVehiculo from '../components/CardVehiculo.vue'

const vehicles = [
    {
        id: 1,
        title: 'Vehiculo 1',
        icon: 'car',
        iconColor: '#34d399',
        details: [
            { icon: 'car-on', label: 'Motor:', value: 'Encendido' },
            { icon: 'gauge', label: 'Velocidad:', value: '30.49 kph' },
            { icon: 'car-battery', label: 'Bateria:', value: '80%' },
            { icon: 'bolt', label: 'Voltaje principal:', value: '13.80 V' },
            { icon: 'gas-pump', label: 'Combustible:', value: '61400.00 ml' },
        ],
    },

    {
        id: 2,
        title: 'Vehiculo 2',
        icon: 'truck',
        iconColor: '#34d399',
        details: [
            { icon: 'car-rear', label: 'Motor:', value: 'Apagado' },
            { icon: 'gauge', label: 'Velocidad:', value: '46.49 kph' },
            { icon: 'car-battery', label: 'Bateria:', value: '74%' },
            { icon: 'bolt', label: 'Voltaje principal:', value: '21.80 V' },
            { icon: 'gas-pump', label: 'Combustible:', value: '85100.00 ml' },
        ],
    },
    {
        id: 3,
        title: 'Vehiculo 3',
        icon: 'bus',
        iconColor: '#34d399',
        details: [
            { icon: 'car-on', label: 'Motor:', value: 'Encendido' },
            { icon: 'gauge', label: 'Velocidad:', value: '68.49 kph' },
            { icon: 'car-battery', label: 'Bateria:', value: '86%' },
            { icon: 'bolt', label: 'Voltaje principal:', value: '23.80 V' },
            { icon: 'gas-pump', label: 'Combustible:', value: '65100.00 ml' },
        ],
    },
 
];
</script>
  
<style scoped>
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cont {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding: 15px 0px;


    @media screen and (max-width: 767px) {
        grid-template-columns: repeat(1, 1fr);
    }
}

.p-card {
    padding: 10px;
    width: 100%;
}

.inline {
    display: flex;
    align-items: center;
    gap: 10px;
}

h4,
p {
    margin: 5px 0px;
}
</style>
  