<script setup lang="ts">
import { ref, onMounted } from "vue";
import { httpService } from "@/services/https.services";

const value = ref(70);
const fechaInicio = ref();
const fechaFinal = ref();
const selectedCalculate = ref();
const calc = ref();
const vehicule = ref();
const device = ref<Device[]>([]);

const linear = ref();
const timestamp = ref();
const battery = ref();
const mileage = ref();
const fuel = ref();
const speed = ref();
const rpm = ref();
const fuellevel = ref();
const accelerate = ref();


const maxspeed = ref();
const averagespeed = ref();
const fuelconsumed = ref();
const distancecovered = ref();

const batteryChart = ref();
const mileageChart = ref();
const fuelChart = ref();
const speedChart = ref();
const accelerateChart = ref();
const fuelLevelChart = ref();
const rpmChart = ref();

interface Device {
    id: number;
    name: string;
}


onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    chartOptionsHorizontal.value = setChartOptionsHorizontal();
    ChartDataHorizontal.value = setChartDataHorizontal();
    GetVehicules();
});

const chartData = ref();
const chartOptions = ref();
const chartOptionsHorizontal = ref();
const ChartDataHorizontal = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['01', '06', '09', '12', '15', '18', '21'],
        datasets: [
            {
                label: 'Demo 1',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            },
            {
                label: 'Demo 2',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--teal-500')
            }
        ]
    };
};

/* const GetVehicules = async () => {
    try {
        const response = await httpService.GetVehiculeList();
        vehicule.value = response
        console.log(vehicule);
        

    } catch (error) {
        console.log("Error: ", error)
    }
} */

const GetVehicules = async () => {
    try {
        const response = await httpService.get('/devices/all')
        device.value = response 

    } catch (error) {
        console.log("Error: ", error)
    }
}

const ObtenerCalculadora = async (id: number, inicio:number, final:number) => {
    try {
        const datatoSend = {
            "from": inicio,
            "to": final,
            "calc_id": 1685511
        }
        const response = await httpService.post(`/devices/${id}/calculate`, datatoSend);
        calc.value = response[0]
        
    } catch (error) {
        console.error('Error recuperando valores: ', error)
    }
}

const GenerarReporte = () => {
    var fechaInicioTimestamp = Math.floor(fechaInicio.value.getTime() / 1000);
    var fechaFinalTimestamp = Math.floor(fechaFinal.value.getTime() / 1000);
    const selected = selectedCalculate.value ? selectedCalculate.value.id : null;
    if (selected !== null) {
        ObtenerCalculadora(selected, fechaInicioTimestamp, fechaFinalTimestamp)
        ObtenerTelemetriaDispositivo(selected, fechaInicioTimestamp, fechaFinalTimestamp)
    }
}

const ObtenerTelemetriaDispositivo = async (id: number, inicio:number, final:number) => {
    try {

        const parameters = "can.vehicle.mileage.high.resolution,vehicle.mileage,can.engine.temperature,external.powersource.voltage,can.fuel.level,can.fuel.consumed,can.wheel.speed,can.engine.rpm,can.throttle.pedal.level,timestamp";
        const datatoSend = {
            "from": inicio,
            "to": final,
            "fields": parameters
        }

        const response = await httpService.getTelemetry(`/devices/${id}/messages`, datatoSend);
        linear.value = response;
        console.log(linear);


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

        rpm.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'can.engine.rpm' in item) {
                    return item['can.engine.rpm'];
                }
                return null;
            })
            .filter(timestamp => timestamp != null);

        accelerate.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'can.throttle.pedal.level' in item) {
                    return item['can.throttle.pedal.level'];
                }
                return null;
            })
            .filter(timestamp => timestamp != null);

        fuellevel.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'can.fuel.level' in item) {
                    return item['can.fuel.level'];
                }
                return null;
            })
            .filter(timestamp => timestamp != null);


        mileage.value = Object.values(linear.value)
            .map(item => {
                if (typeof item === 'object' && 'vehicle.mileage' in item) {
                    return item['vehicle.mileage'];
                }
                return null;
            })
            .filter(timestamp => timestamp != null);

        const fechasNicaragua = timestamp.value.map(timestamp => {
            const fechaUTC = new Date(timestamp * 1000);
            const horaCST = fechaUTC.toLocaleTimeString('en-US', { timeZone: 'America/Managua' });
            return horaCST;
        });

        timestamp.value = fechasNicaragua;

        if (timestamp.value !== null) {
            batteryChart.value = setBattery();
            mileageChart.value = setMileage();
            fuelChart.value = setFuel();
            speedChart.value = setSpeed();
            accelerateChart.value = setAccelerate();
            rpmChart.value = setRPM();
            fuelLevelChart.value = setFuelLevel();
        }
    } catch (error) {
        console.error('Error recuperando valores: ', error)
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

const setRPM = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: Object.values(timestamp.value),
        datasets: [
            {
                label: 'RPM',
                data: Object.values(rpm.value),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            }
        ]
    };
};

const setAccelerate = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: Object.values(timestamp.value),
        datasets: [
            {
                label: 'Aceleración',
                data: Object.values(accelerate.value),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            }
        ]
    };
};

const setFuelLevel = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: Object.values(timestamp.value),
        datasets: [
            {
                label: 'Nivel de Combustible en Litros',
                data: Object.values(fuellevel.value),
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            }
        ]
    };
};

const setChartDataHorizontal = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Hoy'],
        datasets: [
            {
                label: 'Demo 1',
                backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                data: [35, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Demo 2',
                backgroundColor: documentStyle.getPropertyValue('--gray-500'),
                borderColor: documentStyle.getPropertyValue('--gray-500'),
                data: [15, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
}

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

const setChartOptionsHorizontal = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.6,
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
    <h2>Resumen</h2>
    <div class="flex flex-wrap gap-3">
        <div class="flex align-items-center">
            <label class="ml-2">Fecha de Inicio</label>
            <Calendar v-model="fechaInicio" />
        </div>
        <div class="flex align-items-center">
            <label class="ml-2">Fecha Final</label>
            <Calendar v-model="fechaFinal" />
        </div>
        <div class="flex align-items-center">
            <label class="ml-2">Criterio a Evaluar</label>
            <DropDown v-model="selectedCalculate" :options="device" optionLabel="name"
            placeholder="Seleccione el vehículo" class="w-full md:w-14rem" />
        </div>
    </div>
    <div class="flex flex-wrap gap-3">
        <CustomButton label="Filtrar" @click="GenerarReporte"></CustomButton>
    </div>
    <cDivider></cDivider>
    <div class="flex">
        <cCard v-if="maxspeed" class="min">
                <template #title>
                    <FA icon="gauge" />&nbsp;<small>Velocidad Máxima Alcanzada</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="maxspeed" valueColor="#F2b53C" :min="0" :max="200" :strokeWidth="8" readonly />
                        KM/H
                    </div>
                </template>
            </cCard>

            <cCard v-if="fuelconsumed" class="min">
                <template #title>
                    <FA icon="gas-pump" />&nbsp;<small>Combustible Consumido</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="fuelconsumed" valueColor="#F2b53C" :min="0" :max="200" :strokeWidth="8"
                            readonly />
                        en Litros
                    </div>
                </template>
            </cCard>

            <cCard v-if="distancecovered" class="min">
                <template #title>
                    <FA icon="gauge" />&nbsp;<small>Kilometros Recorridos</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="distancecovered" valueColor="#F2b53C" :min="0" :max="1500" :strokeWidth="8"
                            readonly />
                    </div>
                </template>
            </cCard>
            <cCard v-if="averagespeed" class="min">
                <template #title>
                    <FA icon="gauge" />&nbsp;<small>Velocidad Promedio</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="averagespeed" valueColor="#F2b53C" :min="0" :max="150" :strokeWidth="8"
                            readonly />
                        KM/H
                    </div>
                </template>
            </cCard>
            <!-- <cCard v-if="telemetry && 'can.engine.temperature' in telemetry" class="min">
                <template #title>
                    <FA icon="temperature-quarter" />&nbsp;<small>Temperatura Anticongelante</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="telemetry['can.engine.temperature']" :min="0" :max="200" valueColor="#F2b53C"
                            :strokeWidth="8" readonly />
                        °C
                    </div>
                </template>
            </cCard> -->

            <!-- <cCard v-if="telemetry && 'device.temperature' in telemetry" class="min">
                <template #title>
                    <FA icon="temperature-quarter" />&nbsp;<small>Temperatura del Dispositivo</small>
                </template>
                <template #content>
                    <div style="display:flex; justify-content:center; align-items:center;">
                        <cKnob v-model="telemetry['device.temperature']" valueColor="#F2b53C" :strokeWidth="8"
                            readonly />
                        °C
                    </div>
                </template>
            </cCard> -->
        <!-- <cCard>
            <template #title>Recorrido en KM</template>
            <template #content>
                <div class="c-card">
                    <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="45" />
                    Mayor Recorrido
                </div>
            </template>
        </cCard> -->

        <!-- <cCard v-if="calc['fuel_consumed']">
            <template #title>Combustible Gastado</template>
            <template #content>
                <cKnob v-model="calc['fuel_consumed']" :min="0" :max="120" valueColor="#F2b53C" :strokeWidth="8" readonly />
                Maximo Combustible Gastado
            </template>
        </cCard> -->

        <!-- <cCard>
            <template #title>Velocidad Maxima</template>
            <template #content>
                <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="55" />
                Velocidad Maxima Alcanzada
            </template>
        </cCard> -->
    </div>

    <!-- <div class="flex">
        <cCard>
            <template #title>Promedio Kilometros Recorridos</template>
            <template #content>
                <cChart type="bar" :data="ChartDataHorizontal" :options="chartOptionsHorizontal" class="h-30rem" />
            </template>
        </cCard>

        <cCard>
            <template #title>Promedio Combustible Gastado</template>
            <template #content>
                <cChart type="bar" :data="ChartDataHorizontal" :options="chartOptionsHorizontal" class="h-30rem" />
            </template>
        </cCard>
    </div> -->

    <!-- <div>
        <cCard>
            <template #title>Kilometros Recorridos</template>
            <template #content>
                <cChart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
            </template>
        </cCard>
    </div> -->

    <!-- <div>
        <cCard>
            <template #title>Combustible Consumido</template>
            <template #content>
                <cChart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
            </template>
        </cCard>
    </div> -->

    <div class="flex2">
            <cCard class="custom-card" v-if="linear">
                <template #title>Voltaje de Batería del Vehículo</template>
                <template #content>
                    <div class="card-content">
                        <cChart type="line" :data="batteryChart" :options="chartOptions" />
                    </div>
                </template>
            </cCard>
        </div>

        <div class="flex2">
            <cCard class="custom-card" v-if="linear">
                <template #title>Combustible Consumido</template>
                <template #content>
                    <div class="card-content">
                        <cChart type="line" :data="fuelChart" :options="chartOptions" class="h-30rem" />
                    </div>
                </template>
            </cCard>
        </div>

        <div class="flex2">
            <cCard class="custom-card" v-if="linear">
                <template #title>Kilometros Recorridos</template>
                <template #content>
                    <div class="card-content">
                        <cChart type="line" :data="mileageChart" :options="chartOptions" class="h-30rem" />
                    </div>
                </template>
            </cCard>
        </div>

        <div class="flex2">
            <cCard class="custom-card" v-if="linear">
                <template #title>Monitoreo de Velocidad</template>
                <template #content>
                    <div class="card-content">
                        <cChart type="line" :data="speedChart" :options="chartOptions" class="h-30rem" />
                    </div>
                </template>
            </cCard>
        </div>

        <div class="flex2">
            <cCard class="custom-card" v-if="linear">
                <template #title>Nivel de Combustible</template>
                <template #content>
                    <div class="card-content">
                        <cChart type="line" :data="fuelLevelChart" :options="chartOptions" class="h-30rem" />
                    </div>
                </template>
            </cCard>
        </div>

        <div class="flex2">
            <cCard class="custom-card" v-if="linear">
                <template #title>Monitoreo de Aceleración</template>
                <template #content>
                    <div class="card-content">
                        <cChart type="line" :data="accelerateChart" :options="chartOptions" class="h-30rem" />
                    </div>
                </template>
            </cCard>
        </div>

        <div class="flex2">
            <cCard class="custom-card" v-if="linear">
                <template #title>Monitoreo de RPM</template>
                <template #content>
                    <div class="card-content">
                        <cChart type="line" :data="rpmChart" :options="chartOptions" class="h-30rem" />
                    </div>
                </template>
            </cCard>
        </div>

</template>

<style scoped>
.flex {
    display: flex;
    width: 100%;
    gap: 10px;
    padding: 15px;

    @media screen and (max-width: 767px) {
        flex-direction: column;
    }
}

.p-card {
    padding: 10px;
    width: 100%;
}

h2 {
    margin: 15px;
}
</style>