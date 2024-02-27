<script setup lang="ts">

import { httpService } from "@/services/https.services";
import { ref, onMounted } from "vue";
import BarChart from "@/components/BarChart.vue";
import GaugesCar from "@/components/GaugesCar.vue";
import Bars3Chart from "@/components/Bars3Chart.vue";

const selectedVehicle = ref<Device | null>(null);


const telemetry = ref();
const filtertelemetry = ref();

interface Device {
    id: number;
    name: string;
}

const device = ref<Device[]>([]);

const rotationAngle = ref(0);

const rotacionDeVehiculo = (angle : number) =>  {
  rotationAngle.value = angle;
}




onMounted(async () => {
    try {

        device.value = await httpService.get('/devices/all')
    } catch (error) {
        console.error('Error recuperando valores: ', error)
    }
})


const OnChange = () => {
    const selected = selectedVehicle.value ? selectedVehicle.value.id : null;
    if (selected !== null) {
        ObtenerDatosDispositivo(selected);
    }
}

const ObtenerDatosDispositivo = async (id: number) => {
    try {
        const response = await httpService.get(`/devices/${id}`, { 'fields': 'name,protocol_id,protocol_name,telemetry' })
        console.log(response[0].telemetry['can.engine.ignition.status']);

        telemetry.value = response[0].telemetry;

        const selectParams = ['can.fuel.volume', 'can.fuel.level', 'can.fuel.consumed', 'can.fuel.consumed.high.resolution', 'can.engine.fuel.rate'];
        filtertelemetry.value = Object.fromEntries(
            Object.entries(telemetry.value).filter(([key]) => selectParams.includes(key))

        )

        if (filtertelemetry.value !== null) {
            chartData.value = setChartData();
        }

    } catch (error) {
        console.error('Error recuperando valores: ', error)
    }
}

onMounted(() => {
    //chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    console.log(filtertelemetry);


    return {
        labels: ['Combustible (l)', 'Combustible (ml)', 'Consumo Total', 'Consumo Total', 'Nivel Combustible'],
        datasets: [
            {
                label: 'Combustible',
                data: Object.values(filtertelemetry.value),
                fill: false,
                tension: 0.4,
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
            },
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
<template>
    <div style="display:flex; align-items:center; justify-content: space-around;">
        <h1>Tablero</h1>
        <DropDown v-model="selectedVehicle" :options="device" @change="OnChange" optionLabel="name"
            placeholder="Seleccione el vehiculo" class="w-full md:w-14rem" />
    </div>

    <div class="cont">
        <div>
            <!--aqui el velocimetro-->
            <GaugesCar/>
        </div>

        <div class="circulo" :style="{ transform: `rotate(${rotationAngle}deg)` }" >
            <div class="carretera">
                <div class="linea"></div>
                <img src="../../src/assets/car.png" class="car">
            </div>
        </div>

        <div v-if="telemetry && 'external.powersource.voltage' in telemetry"
            style="display:flex; justify-content:center; align-items:center;">
            <BarChart titulo="Aceleración" data="36" name="aceleración"></BarChart>
        </div>

    </div>

    <div class="icons">
        <span v-tooltip.top="'Vehiculo encendido'">
            <FA style="font-size: 2rem;" icon="car-rear" class="on" />
        </span>
        <span v-tooltip.top="'Nivel de combustible:'"
            style="display:flex; flex-direction: column; justify-content:center; gap: 5px;">
            <FA style="font-size: 2rem;" icon="gas-pump" class="on" />
            <small>65 lt</small>
        </span>
        <span v-tooltip.top="'Bateria: %'" style="display:flex; flex-direction: column; justify-content:center; gap: 5px;">
            <FA style="font-size: 2rem;" icon="car-battery" class="on" />
            <small>65 %</small>
        </span>
        <span v-tooltip.top="'Jirar a la izquierda'">
            <FA style="font-size: 2rem;" icon="caret-left" class="off" />
        </span>
        <span v-tooltip.top="'Jirar a la derecha'">
            <FA style="font-size: 2rem;" icon="caret-right" class="off" />
        </span>
        <button @click="rotacionDeVehiculo(-90)">Rotar circulo</button>
    </div>
    <cDivider></cDivider>
    <div class="flex">
        <cCard v-if="telemetry && 'external.powersource.voltage' in telemetry">
            <template #title>
               
            </template>
            <template #content>
                <div style="display:flex; justify-content:center; align-items:center;">
                    <Bars3Chart />
                </div>
            </template>
        </cCard>
        <cCard v-if="telemetry && 'external.powersource.voltage' in telemetry" class="min">
            <template #title>
                <FA icon="car-battery" />&nbsp;<small>Bateria Principal </small>
            </template>
            <template #content>
                <div style="display:flex; justify-content:center; align-items:center;">
                    <cKnob v-model="telemetry['external.powersource.voltage']" valueColor="#F2b53C" :strokeWidth="8"
                        readonly />
                </div>
            </template>
        </cCard>
        <cCard v-if="telemetry && 'battery.voltage' in telemetry" class="min">
            <template #title>
                <FA icon="car-battery" />&nbsp;<small>Bateria interna</small>
            </template>
            <template #content>
                <div style="display:flex; justify-content:center; align-items:center;">
                    <cKnob v-model="telemetry['battery.voltage']" class="ind1" valueColor="#8c3df9" readonly
                        :strokeWidth="8" />
                </div>
            </template>
        </cCard>
        <cCard v-if="telemetry && 'device.temperature' in telemetry" class="min">
            <template #title>
                <FA icon="temperature-quarter" />&nbsp;<small>Temperatura del vehiculo</small>
            </template>
            <template #content>
                <div style="display:flex; justify-content:center; align-items:center;">
                    <cKnob v-model="telemetry['device.temperature']" valueColor="#F2b53C" :strokeWidth="8" readonly />
                </div>
            </template>
        </cCard>

        <cCard v-if="telemetry && 'can.engine.temperature' in telemetry"
            style="display:flex; justify-content:center; align-items:center;" class="min">
            <template #title>
                <FA icon="temperature-quarter" />&nbsp;<small>Temperatura de motor</small>
            </template>
            <template #content>
                <div style="display:flex; justify-content:center; align-items:center;">
                    <cKnob v-model="telemetry['can.engine.temperature']" valueColor="#F2b53C" :strokeWidth="8" readonly />
                </div>

            </template>
        </cCard>

    </div>
    <div class="flex">

        <cCard v-if="telemetry" style="width:600px;">
            <template #title>Kilometraje</template>
            <template #content>
                <cChart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
            </template>
        </cCard>

    </div>
</template>
<style scoped>


h3 {
    text-align: center;
}

.icons {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    width: 300px;
    gap: 10px;
    margin: 0 auto;
}

.on {
    color: #00ff00;

    filter: drop-shadow(0 0 0.5rem #00ff00);

}

.off {
    color: #1f2937;
}

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
    width: 130%;
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
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

.cont {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 0px;
}

.flex {
    display: flex;
    width: 100%;
    gap: 10px;
    padding: 15px;
    flex-wrap: wrap;

    @media screen and (max-width: 767px) {
        flex-direction: column;
    }
}

.min {
    width: fit-content;
    height: fit-content
}

.p-card {
    padding: 10px;
}
</style>