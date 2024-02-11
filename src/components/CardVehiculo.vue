<template>
    <cCard>
        <template #title>
            <FA :icon="vehicle.icon" :color="vehicle.iconColor" /> {{ vehicle.title }}
        </template>
        <template #content>
            <span class="inline" v-for="detail in vehicle.details" :key="detail.icon">
                <FA :icon="detail.icon" :color="vehicle.iconColor" />
                <h4>{{ detail.label }}</h4>
                <p>{{ detail.value }}</p>
            </span>

        </template>
        <template #footer>
            <CustomButton icon="pi pi-map" text label="Ver en mapa"></CustomButton>
        </template>
    </cCard>

    <div>
        <div>
            <div class="card" v-if="datosTarjeta">
                <div v-for="item in datosTarjeta" :key="item.id">
                    <h2>Id Dispositivo: {{ item.id }}</h2>
                    <h2>Nombre Dispositivo: {{ item.name }}</h2>
                    <h2>Mensaje: {{ item.messages_ttl }}</h2>
                    <h2>Tipo Dispositivo: {{ item.device_type_id }}</h2>
                </div>
            </div>
            <div v-else>
                Cargando datos...
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, onMounted, ref } from 'vue';

import axios from 'axios';

const token = 'i9OjixYozzHImqyv7CkOH5mgijWXfjjngYuojjAHG5fSmDbj3kWyd6Fmfp7jwhuD';
const url = 'https://flespi.io/gw/devices/all';

const config = {
    headers: {
        Authorization: `FlespiToken ${token}`,
    },
};

interface ResultItem {
  id: number;
  messages_ttl: number;
  device_type_id: number;
  name: string;
}

const datosTarjeta = ref<ResultItem[]>([]);

onMounted(async () => {
    try {
        const response = await axios.get(url, config);
        console.log("Respuesta", response.data.result);
        datosTarjeta.value = response.data.result;
        console.log("Datos del Dispositivo", datosTarjeta.value);
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
})


const props = defineProps(['vehicle']);

const { vehicle } = toRefs(props);
</script>

<style scoped>
.inline {
    display: flex;
    align-items: center;
    gap: 10px;
}

h4,
p {
    margin: 5px 0px;
}

.p-card {
    padding: 10px;
    width: 100%;
}
</style>