<template>
    <div class="circulo" :style="AnguloVehiculo">
        <div class="carretera">
            <div class="linea" :class="moverLinea"></div>
            <img src="../../src/assets/car.png" class="car" :class="moverAuto">
        </div>
    </div>

</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { defineProps } from 'vue';

const props = defineProps(['angulo', 'status']);

const moverLinea = computed(() => {
    //return 'activar-linea';
    if (props.status === true) {
        return 'activar-linea';
    } else {
        return '';
    }
});

const moverAuto = computed(() => {
    // return 'activar-auto';
    if (props.status === true) {
        return 'activar-auto';
    } else {
        return '';
    }
});

const AnguloVehiculo = computed(() => {
    const angulo = props.angulo || 0;
    return angulo ? { transform: `rotate(${angulo}deg)` } : ' ';
});

onMounted(() => {
    console.log('Componente montado', ' ',props.angulo, props.status);
});
</script>
<style scoped>
.circulo {
    width: 270px;
    height: 270px;
    border-radius: 50%;
    background-color: #1f2937;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: 2s ease-in-out;
}

.carretera {
    width: 150px;
    height: 100%;
    position: relative;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.linea {
    width: 4px;
    height: 100%;
    background-color: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.activar-linea {
    animation: mover-linea 2s linear infinite;
}

@keyframes mover-linea {
    0% {
        top: 0;
    }

    100% {
        top: 100%;
    }
}

.car {
    width: 120%;
    position: absolute;
    bottom: 0;
}

.activar-auto {
    animation: mover-auto 2s linear infinite;
}

@keyframes mover-auto {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-50px);
    }

    100% {
        transform: translateY(0);
    }
}

@media screen and (max-width: 767px) {
    .circulo {
        width: 140px;
        height: 140px;
        border: 3px solid #34d399;
     
    }

    .car {
        width: 90%;

    }

    .carretera {
        width: 80px;
    }
}
</style>