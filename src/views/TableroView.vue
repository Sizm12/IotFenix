<script setup lang="ts">
import { httpService } from "@/services/https.services";
import { ref, onMounted, computed } from "vue";
import GaugesCar from "@/components/GaugesCar.vue";
import AnimationSvg from "@/components/AnimationSvg.vue";
import SignalsComponent from "@/components/SignalsComponent.vue";
import BatteryComponent from "@/components/BatteryComponent.vue";
import CarAnimation from "@/components/CarAnimation.vue";
import IconAcelerador from "@/components/icons/IconAcelerador.vue";
import BarChart from "@/components/BarChart.vue";
import type { color } from "highcharts";
const selectedVehicle = ref<Device | null>(null);

const telemetry = ref();
const filtertelemetry = ref();
const linear = ref();
const timestamp = ref();
const battery = ref();
const mileage = ref();
const fuel = ref();
const speed = ref();
const calc = ref();

const maxspeed = ref();
const averagespeed = ref();
const fuelconsumed = ref();
const distancecovered = ref();

const batteryChart = ref();
const mileageChart = ref();
const fuelChart = ref();
const speedChart = ref();

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

const ObtenerCalculadora = async (id: number) => {
    try {
        var fechainicio = new Date();
        fechainicio.setHours(11);
        fechainicio.setMinutes(0);
        fechainicio.setSeconds(0);

        var fechainiciotimestamp = Math.floor(fechainicio.getTime() / 1000);

        var fechafinal = new Date();
        fechafinal.setHours(23);
        fechafinal.setMinutes(59);
        fechafinal.setSeconds(0);
        var fechafinaltimestamp = Math.floor(fechafinal.getTime() / 1000);
        const datatoSend = {
            "from": fechainiciotimestamp,
            "to": fechafinaltimestamp,
            "calc_id": 1685511
        }
        const response = await httpService.post(`/devices/${id}/calculate`, datatoSend);
        calc.value = response[0]
    } catch (error) {
        console.error('Error recuperando valores: ', error)
    }
}


const OnChange = () => {
    const selected = selectedVehicle.value ? selectedVehicle.value.id : null;
    if (selected !== null) {
        ObtenerDatosDispositivo(selected);
        ObtenerTelemetriaDispositivo(selected);
        ObtenerCalculadora(selected);
    }
}

const setBattery = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: Object.values(timestamp.value),
        datasets: [
            {
                label: 'Bateria Voltaje',
                data: Object.values(battery.value),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            }
        ]
    };
};

const CalculateConsumed = (data) => {
    const newData = [];
    let increment = 0;
    for (let i = 1; i < data.length; i++) {
        const actual = data[i] - data[i - 1];
        increment += actual;
        newData.push(increment)
    }
    return newData
}

const setMileage = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const distance = CalculateConsumed(mileage.value)
    distancecovered.value = Math.round(Math.max(...distance));

    return {
        labels: Object.values(timestamp.value),
        datasets: [
            {
                label: 'Recorrido',
                data: Object.values(distance),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            }
        ]
    };
};

const setFuel = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const fuelvalue = CalculateConsumed(fuel.value)
    fuelconsumed.value = Math.round(Math.max(...fuelvalue));

    return {
        labels: Object.values(timestamp.value),
        datasets: [
            {
                label: 'Combustible',
                data: Object.values(fuelvalue),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            }
        ]
    };
};

const setSpeed = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    maxspeed.value = Math.round(Math.max(...speed.value));
    const sum = speed.value.reduce((count, value) => count + value, 0);
    averagespeed.value = Math.round(sum / speed.value.length)
    return {
        labels: Object.values(timestamp.value),
        datasets: [
            {
                label: 'Velocidad',
                data: Object.values(speed.value),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            }
        ]
    };
};

const ObtenerTelemetriaDispositivo = async (id: number) => {
    try {
        var fechainicio = new Date();
        fechainicio.setHours(0);
        fechainicio.setMinutes(0);
        fechainicio.setSeconds(0);

        var fechainiciotimestamp = Math.floor(fechainicio.getTime() / 1000);

        var fechafinal = new Date();
        fechafinal.setHours(23);
        fechafinal.setMinutes(59);
        fechafinal.setSeconds(0);
        var fechafinaltimestamp = Math.floor(fechafinal.getTime() / 1000);

        const parameters = "can.vehicle.mileage.high.resolution,can.fuel.volume,vehicle.mileage,external.powersource.voltage,can.fuel.consumed,can.wheel.speed,timestamp";
        const datatoSend = {
            "from": fechainiciotimestamp,
            "to": fechafinaltimestamp,
            //"from": 1714545468,
            //"to": 1714628510,
            "fields": parameters
        }

        const response = await httpService.getTelemetry(`/devices/${id}/messages`, datatoSend);
        linear.value = response;

        timestamp.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'timestamp' in item) {
                    return item.timestamp;
                }
                return null;
            })
            .filter(timestamp => timestamp != null);

        battery.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'external.powersource.voltage' in item) {
                    return item['external.powersource.voltage'];
                }
                return null;
            })
            .filter(timestamp => timestamp != null);

        fuel.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'can.fuel.consumed' in item) {
                    return item['can.fuel.consumed'];
                }
                return null;
            })
            .filter(timestamp => timestamp != null);

        speed.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'can.wheel.speed' in item) {
                    return item['can.wheel.speed'];
                }
                return null;
            })
            .filter(timestamp => timestamp != null);


        mileage.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'can.vehicle.mileage.high.resolution' in item) {
                    return item['can.vehicle.mileage.high.resolution'];
                }
                return null;
            })
            .filter(timestamp => timestamp != null);

        const fechasNicaragua = timestamp.value.map(timestamp => {
            const fechaUTC = new Date(timestamp * 1000);
            const horaCST = fechaUTC.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' });
            return horaCST;
        });

        timestamp.value = fechasNicaragua;

        if (timestamp.value !== null) {
            batteryChart.value = setBattery();
            mileageChart.value = setMileage();
            fuelChart.value = setFuel();
            speedChart.value = setSpeed();
        }
    } catch (error) {
        console.error('Error recuperando valores: ', error)
    }
}

const ObtenerDatosDispositivo = async (id: number) => {
    try {
        const response = await httpService.get(`/devices/${id}`, { 'fields': 'name,protocol_id,protocol_name,telemetry' })

        telemetry.value = response[0].telemetry;

        const selectParams = ['can.fuel.volume', 'can.fuel.level', 'can.fuel.consumed', 'can.fuel.consumed.high.resolution', 'can.engine.fuel.rate', 'position.direction', 'gsm.signal.dbm', 'can.vehicle.speed'];
        filtertelemetry.value = Object.fromEntries(
            Object.entries(telemetry.value).filter(([key]) => selectParams.includes(key))
        )

    } catch (error) {
        console.error('Error recuperando valores: ', error)
    }
}

const vehiculoOn = computed(() => {
    //return 'on';
    if (telemetry.value['config.engine.ignition.status']) {
        return true;
    } else {
        return false;
    }
});

const getClassAcelerador = computed(() => {
    if (telemetry.value['can.throttle.pedal.level'] > 0) {
        return 'aceleradorOn';
    } else {
        return 'aceleradorOff';
    }
});


onMounted(() => {
    //chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

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
                    color: textColorSecondary,
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
            placeholder="Seleccione el vehículo" class="w-full md:w-14rem" />
    </div>
    <AnimationSvg v-if="!telemetry" />
    <div v-if="telemetry">
        <div style="display:flex; width:100%; justify-content:flex-end; gap: 10px;">
            <BatteryComponent :battery="telemetry['battery.voltage']"></BatteryComponent>
            <SignalsComponent :dbm="telemetry['gsm.signal.dbm']" :satellites="telemetry['position.satellites']">
            </SignalsComponent>
        </div>
        <div class="cont">
            <div>
                <!--aqui el velocimetro-->
                <GaugesCar :rpm="telemetry['can.engine.rpm']" :velocidad="telemetry['can.wheel.speed']" />
            </div>
            <div style="display:flex; justify-content:center; width:100%;font-weight:400;">
                <!--aqui el carro-->
                <CarAnimation :angulo="telemetry['position.direction']" :status="telemetry['movement.status']">
                </CarAnimation>
            </div>

            <cChart type="bar" :data="{
                labels: ['Aceleración'],
                datasets: [
                    {
                        label: 'Aceleracion',
                        //data: [telemetry['can.throttle.pedal.level']],
                        data: [telemetry['can.throttle.pedal.level']],
                        backgroundColor: ['rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                        borderColor: ['rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                        borderWidth: 1,
                        barThickness: 30,
                        color: '#fff',
                    }
                ]
            }" class="h-30rem" />
        </div>

        <div
            style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0px 20px;">

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
                <span v-tooltip.top="'Aceleración'"
                    style="display:flex; flex-direction: column; justify-content:center; gap: 5px; align-items:center;">
                    <IconAcelerador :class="getClassAcelerador"></IconAcelerador>
                    <small>{{ telemetry['can.throttle.pedal.level'] }} %</small>
                </span>
            </div>

        </div>

        <cDivider></cDivider>
        <div class="flex">

            <cCard v-if="telemetry && 'device.temperature' in telemetry" class="min">
                <template #title>
                    <FA icon="gauge" />&nbsp;<small>Velocidad Máxima Alcanzada</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="maxspeed" valueColor="#F2b53C" :strokeWidth="8" readonly />
                    </div>
                </template>
            </cCard>

            <cCard v-if="telemetry && 'device.temperature' in telemetry" class="min">
                <template #title>
                    <FA icon="gas-pump" />&nbsp;<small>Combustible Consumido</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="fuelconsumed" valueColor="#F2b53C" :strokeWidth="8" readonly />
                    </div>
                </template>
            </cCard>

            <cCard v-if="telemetry && 'device.temperature' in telemetry" class="min">
                <template #title>
                    <FA icon="gauge" />&nbsp;<small>Kilometros Recorridos</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="distancecovered" valueColor="#F2b53C" :strokeWidth="8" readonly />
                    </div>
                </template>
            </cCard>
            <cCard v-if="telemetry && 'device.temperature' in telemetry" class="min">
                <template #title>
                    <FA icon="gauge" />&nbsp;<small>Velocidad Promedio</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="averagespeed" valueColor="#F2b53C" :strokeWidth="8" readonly />
                    </div>
                </template>
            </cCard>
            <cCard v-if="telemetry && 'device.temperature' in telemetry" class="min">
                <template #title>
                    <FA icon="temperature-quarter" />&nbsp;<small>Temperatura Anticongelante</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="telemetry['can.engine.temperature']" :min="0" :max="200" valueColor="#F2b53C"
                            :strokeWidth="8" readonly />
                    </div>
                </template>
            </cCard>

            <cCard v-if="telemetry && 'device.temperature' in telemetry" class="min">
                <template #title>
                    <FA icon="temperature-quarter" />&nbsp;<small>Temperatura del Dispositivo</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="telemetry['device.temperature']" valueColor="#F2b53C" :strokeWidth="8"
                            readonly />
                    </div>
                </template>
            </cCard>
        </div>

        <div class="flex">

            <cCard v-if="linear">
                <template #title>Voltaje Bateria</template>
                <template #content>
                    <cChart type="line" :data="batteryChart" :options="chartOptions" class="h-30rem" />
                </template>
            </cCard>

            <cCard v-if="linear">
                <template #title>Combustible Consumido</template>
                <template #content>
                    <cChart type="line" :data="fuelChart" :options="chartOptions" class="h-30rem" />
                </template>
            </cCard>

            <cCard v-if="linear">
                <template #title>Kilometros Recorridos</template>
                <template #content>
                    <cChart type="line" :data="mileageChart" :options="chartOptions" class="h-30rem" />
                </template>
            </cCard>

            <cCard v-if="linear">
                <template #title>Monitoreo de Velocidad</template>
                <template #content>
                    <cChart type="line" :data="speedChart" :options="chartOptions" class="h-30rem" />
                </template>
            </cCard>

        </div>
        <div class="flex">



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

.aceleradorOff {
    color: #1f2937;
}

.aceleradorOn {
    color: #00ff00;
    filter: drop-shadow(0 0 0.5rem #00ff00);
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
