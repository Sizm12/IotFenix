<template>
    <div 
        style="display:flex; justify-content: center; align-items: center; margin-right: 5px;">
        <!-- señal baja -->
     
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                stroke="#33c0f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-battery-4">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                    d="M6 7h11a2 2 0 0 1 2 2v.5a.5 .5 0 0 0 .5 .5a.5 .5 0 0 1 .5 .5v3a.5 .5 0 0 1 -.5 .5a.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" />
                <path d="M7 10l0 4" />
                <path d="M10 10l0 4" />
                <path d="M13 10l0 4" />
                <path d="M16 10l0 4" />
            </svg>
      
        <small>
            {{ props.battery +'V' }}
        </small>
    </div>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['battery']);

</script>