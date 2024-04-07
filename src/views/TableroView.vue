<script setup lang="ts">
import { httpService } from "@/services/https.services";
import { ref, onMounted, computed } from "vue";
import BarChart from "@/components/BarChart.vue";
import GaugesCar from "@/components/GaugesCar.vue";
import Bars3Chart from "@/components/Bars3Chart.vue";
import AnimationSvg from "@/components/AnimationSvg.vue";
import SignalsComponent from "@/components/SignalsComponent.vue";
import BatteryComponent from "@/components/BatteryComponent.vue";
import CarAnimation from "@/components/CarAnimation.vue";

const selectedVehicle = ref<Device | null>(null);

const telemetry = ref();
const filtertelemetry = ref();

interface Device {
    id: number;
    name: string;
}

const device = ref<Device[]>([]);

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

        console.log(telemetry.value);

        const selectParams = ['can.fuel.volume', 'can.fuel.level', 'can.fuel.consumed', 'can.fuel.consumed.high.resolution', 'can.engine.fuel.rate', 'position.direction', 'gsm.signal.dbm', 'can.vehicle.speed'];
        filtertelemetry.value = Object.fromEntries(
            Object.entries(telemetry.value).filter(([key]) => selectParams.includes(key))
        )

        if (filtertelemetry.value !== null) {
            chartData.value = setChartData();
        }

        console.log(filtertelemetry.value);

    } catch (error) {
        console.error('Error recuperando valores: ', error)
    }
}

const vehiculoOn = computed(() => {
    //return 'on';
    if (telemetry.value['can.engine.ignition.status'] === true) {
        return true;
    } else {
        return false;
    }
});

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
    <AnimationSvg v-if="!telemetry" />
    <div v-if="telemetry">
        <div class="cont">
            <div>
                <!--aqui el velocimetro-->
                <GaugesCar :rpm="telemetry['can.engine.rpm']" :velocidad="telemetry['can.vehicle.speed']" />
            </div>
            <div style="display:flex; justify-content:center; width:100%;font-weight:400;">
                <!--aqui el carro-->
                <CarAnimation :angulo="telemetry['position.direction']"
                    :status="telemetry['can.engine.ignition.status']">
                </CarAnimation>

                <div v-if="telemetry && 'external.powersource.voltage' in telemetry"
                    style="display:flex; justify-content:center; align-items:center;">
                    <BarChart titulo="Aceleración" data="36" name="aceleración" class="none"></BarChart>
                </div>
            </div>
        </div>

        <div
            style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0px 20px;">
            <BatteryComponent :battery="telemetry['battery.voltage']"></BatteryComponent>
            <div class="icons">
                <span v-tooltip.top="vehiculoOn ? 'Encendido' : 'Apagado'">
                    <FA style="font-size: 2rem;" icon="car-rear" :class="vehiculoOn ? 'on' : 'off'" />
                </span>
                <span v-tooltip.top="'Nivel de combustible:'"
                    style="display:flex; flex-direction: column; justify-content:center; gap: 5px;">
                    <FA style="font-size: 2rem;" icon="gas-pump" class="on" />
                    <small>{{ telemetry['can.fuel.level'] }} lt</small>
                </span>
                <span v-tooltip.top="'Bateria: %'"
                    style="display:flex; flex-direction: column; justify-content:center; gap: 5px;">
                    <FA style="font-size: 2rem;" icon="car-battery" class="on" />
                    <small>{{ telemetry['external.powersource.voltage'] }} %</small>
                </span>
                <span v-tooltip.top="'Jirar a la izquierda'">
                    <FA style="font-size: 2rem;" icon="caret-left" class="desac" />
                </span>
                <span v-tooltip.top="'Jirar a la derecha'">
                    <FA style="font-size: 2rem;" icon="caret-right" class="desac" />
                </span>
            </div>
            <SignalsComponent :dbm="telemetry['gsm.signal.dbm']" :satellites="telemetry['position.satellites']">
            </SignalsComponent>
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
                        <cKnob v-model="telemetry['device.temperature']" valueColor="#F2b53C" :strokeWidth="8"
                            readonly />
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
                        <cKnob v-model="telemetry['can.engine.temperature']" valueColor="#F2b53C" :strokeWidth="8"
                            readonly />
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

.desac {
    color: #1f2937;
}

.off {
    color: red;
    filter: drop-shadow(0 0 0.5rem red);
}

.cont {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 0px;
    justify-content: center;

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

@media screen and (max-width: 767px) {
    .none {
        display: none;
    }

    .ocul {
        display: none
    }

    .cont {
        flex-direction: column;
        justify-content: baseline;
        align-items: start;
    }
}
</style>
