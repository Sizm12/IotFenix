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
</template>

<script setup lang="ts">
import { toRefs } from 'vue';


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