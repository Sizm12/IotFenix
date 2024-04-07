<template >
    <div class="dflex col">

        <div v-tooltip.top="props.dbm + ' : dbm'" style="display:flex; justify-content: center; align-items: center; margin-right: 5px; ">
        <!-- señal baja -->
        <template v-if="condicion === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#7ECA26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-5">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 18l0 -3" />
                <path d="M10 18l0 -6" />
                <path d="M14 18l0 -9" />
                <path d="M18 18l0 -12" />
            </svg>
        </template>
        <template v-if="condicion === 2">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#CDE20E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-4">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 18l0 -3" />
                <path d="M10 18l0 -6" />
                <path d="M14 18l0 -9" />
                <path d="M18 18l0 .01" />
            </svg>
        </template>
        <template v-if="condicion === 3">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#F3EE1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-3">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 18l0 -3" />
                <path d="M10 18l0 -6" />
                <path d="M14 18l0 .01" />
                <path d="M18 18l0 .01" />
            </svg>
        </template>
        <template v-if="condicion === 4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#FCDD12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 18l0 -3" />
                <path d="M10 18l0 .01" />
                <path d="M14 18l0 .01" />
                <path d="M18 18l0 .01" />
            </svg>
        </template>
        <template v-if="condicion === 5">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#F58613" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-1">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 18l0 .01" />
                <path d="M10 18l0 .01" />
                <path d="M14 18l0 .01" />
                <path d="M18 18l0 .01" />
            </svg>
        </template>
        <template v-if="condicion === 6">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#EE4521" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-antenna-bars-off">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 18v-3" />
                <path d="M10 18v-6" />
                <path d="M14 18v-4" />
                <path d="M14 10v-1" />
                <path d="M18 14v-8" />
                <path d="M3 3l18 18" />
            </svg>
        </template>

        <small style="display: flex">
            {{ props.dbm + ':dbm' }}
        </small>
    </div>

    <div class="dflex"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#33c0f0"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-satellite">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
                d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5.586 5.586a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5.586 -5.586a1 1 0 0 1 0 -1.414z" />
            <path d="M6 10l-3 3l3 3l3 -3" />
            <path d="M10 6l3 -3l3 3l-3 3" />
            <path d="M12 12l1.5 1.5" />
            <path d="M14.5 17a2.5 2.5 0 0 0 2.5 -2.5" />
            <path d="M15 21a6 6 0 0 0 6 -6" />
        </svg>
        <small>
            {{ props.satellites }}
        </small>
    </div>

    </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';

var condicion: number = 0;

const props = defineProps(['dbm', 'satellites']);

switch (true) {
    case props.dbm <= 30:
        condicion = 1;
        break;
    case props.dbm <= 50:
        condicion = 2;
        break;
    case props.dbm <= 60:
        condicion = 3;
        break;
    case props.dbm <= 67:
        condicion = 4;
        break;
    case props.dbm <= 70:
        condicion = 5;
        break;
    case props.dbm <= 80:
        condicion = 5;
        break;
    case props.dbm <= 90:
        condicion = 6;
        break;
    default:
        condicion = 0;
        break;
}

</script>

<style scoped>

.dflex{
    display: flex;
    justify-content: center;
    align-items: center;
}
@media screen and (max-width: 767px) {
    .col{
        flex-direction: column;
    }
}
</style>