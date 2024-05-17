<script setup lang="ts">
import { ref, onMounted } from "vue";
import { httpService } from "@/services/https.services";

import CharBars from "@/components/CharBars.vue";
const value = ref(70);

onMounted(() => {
    //chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    GetDeviceList();
    GetDriversList();
    GetVehicules();
    ObtenerCalculadora();
});

const ObtenerCalculadora = async () => {
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

        const datatoSend = {
            //"from": fechainiciotimestamp,
            "from": 1715580000,
            //"to": fechafinaltimestamp,
            "to": 1716011940,
            "calc_id": 1685511
        }
        const response = await httpService.post(`/devices/all/calculate`, datatoSend);
        console.log(response);
        const groupedData = {};

        // Iteramos sobre cada objeto en el arreglo 'data'
        response.forEach(item => {
            if (!groupedData.hasOwnProperty(item.device)) {
                //groupedData[item.device] = { labels: [], datasets: [] };
                groupedData[item.device] = { labels: [], datasets: { distance: [], fuel: [] } };
            }

            const deviceData = groupedData[item.device];

            const deviceTimestamps = deviceData.labels;
            const deviceValues = deviceData.datasets;

            if (!deviceTimestamps.includes(item.begin)) {
                const FechaUTC = new Date(item.begin * 1000)
                const horaCST = FechaUTC.toLocaleDateString('en-US', { timeZone: 'America/Managua' })
                deviceTimestamps.push(horaCST);
            }

            deviceValues.distance.push(item.distance_covered)
            deviceValues.fuel.push(item.fuel_consumed)

            /* let dataset = deviceValues.find(dataset => dataset.label === item.device);
            if (!dataset) {
                dataset = {
                    label: item.device,
                    data: [],
                    fill: false,
                    tension: 0.4,
                    borderColor: '#007bff'
                };
                deviceValues.push(dataset);
            }
            dataset.data.push(item.distance_covered); */



        });

        console.log(groupedData);


        chartDistance.value = setChartDistance(groupedData)
        chartFuel.value = setChartFuel(groupedData)

        //calc.value = response[0]

    } catch (error) {
        console.error('Error recuperando valores: ', error)
    }
}

const chartDistance = ref();
const chartData = ref();
const chartFuel = ref();
const chartOptions = ref();

const getState = (state) => {

    switch (state.active) {
        case true:
            return 'success';
        case false:
            return 'danger';
        default:
            return 'success';
    }
}

const getStateValue = (state) => {

    switch (state.active) {
        case true:
            return 'Activo';
        case false:
            return 'Inactivo';
        default:
            return 'Desconocido';
    }
}

const driver = ref()
const device = ref()
const vehicules = ref();
const deviceqty = ref();
const driverqty = ref();
const vehiculeqty = ref();

const GetVehicules = async () => {
    try {
        const response = await httpService.GetVehicule('getVehicule');
        vehicules.value = response
        vehiculeqty.value = vehicules.value.length
    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetDriversList = async () => {
    try {
        const response = await httpService.GetDrivers();
        driver.value = response
        driverqty.value = driver.value.length
    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetDeviceList = async () => {
    try {
        const response = await httpService.GetDevices();
        device.value = response
        deviceqty.value = device.value.length
    } catch (error) {
        console.log("Error: ", error)
    }
}


const vehicles = [
    {
        id: 1,
        title: 'Vehiculo 1',
        identification: '123456',
        device: 'Demo3',
        icon: 'car',
        iconColor: '#34d399',
        state: 'Activo'

    },

    {
        id: 2,
        title: 'Vehiculo 2',
        identification: '123456',
        device: 'Demo1',
        icon: 'truck',
        iconColor: '#34d399',
        state: 'Inactivo'
    },
    {
        id: 3,
        title: 'Vehiculo 3',
        identification: '123456',
        device: 'Demo2',
        icon: 'bus',
        iconColor: '#34d399',
        state: 'Activo'
    },

];

const setChartDistance = (data) => {

    const documentStyle = getComputedStyle(document.documentElement);
    const chartData = {
        labels: [],
        datasets: []
    }

    for (const device in data) {
        if (data.hasOwnProperty(device)) {
            const deviceData = data[device]
            const distanceData = deviceData.datasets.distance

            chartData.labels = deviceData.labels

            const dataset = {
                label: device,
                data: distanceData,
                fill: false,
                tension: 0.4,
                borderColor: '#007bff'
            }
            chartData.datasets.push(dataset)
        }
    }
    return chartData
};

const setChartFuel = (data) => {

    const documentStyle = getComputedStyle(document.documentElement);
    const chartData = {
        labels: [],
        datasets: []
    }

    for (const device in data) {
        if (data.hasOwnProperty(device)) {
            const deviceData = data[device]
            const fuelData = deviceData.datasets.fuel

            chartData.labels = deviceData.labels

            const dataset = {
                label: device,
                data: fuelData,
                fill: false,
                tension: 0.4,
                borderColor: '#007bff'
            }
            chartData.datasets.push(dataset)
        }
    }
    return chartData
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
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
    <h2>Dashboard</h2>
    <cDivider></cDivider>

    <div class="flex">
        <cCard>
            <template #title>Dispositivos</template>
            <template #content>
                <div class="c-card">
                    <cKnob v-model="deviceqty" valueColor="#F2b53C" :strokeWidth="8" :min="0" :max="15" readonly />
                    Dispositivos Registrados
                </div>
            </template>
        </cCard>

        <cCard>
            <template #title>Vehiculos</template>
            <template #content>
                <cKnob v-model="vehiculeqty" valueColor="#F2b53C" :strokeWidth="8" :min="0" :max="15" readonly />
                Vehiculos Registrados
            </template>
        </cCard>
        <cCard>
            <template #title>Conductores</template>
            <template #content>
                <cKnob v-model="driverqty" valueColor="#F2b53C" :strokeWidth="8" :min="0" :max="15" readonly />
                Conductores Registrados
            </template>
        </cCard>
    </div>

    <div class="flex2">
        <cCard class="custom-card">
            <template #title>Combustible Consumido</template>
            <template #content>
                <div class="card-content">
                    <cChart type="line" :data="chartFuel" :options="chartOptions" class="h-30rem" />
                </div>
            </template>
        </cCard>
    </div>


    <div class="flex">
        <cCard>
            <template #title>Conductores</template>
            <template #content>
                <DataTable :value="driver" tableStyle="min-width: 50rem">
                    <cColumn field="id" header="No. de Registro"></cColumn>
                    <cColumn field="name" header="Nombre Conductor"></cColumn>
                    <cColumn field="email" header="Correo Electrónico"></cColumn>
                    <cColumn field="phone" header="Teléfono"></cColumn>
                    <cColumn field="vat" header="Identificación Fiscal"></cColumn>
                    <cColumn field="address" header="Dirección"></cColumn>
                    <cColumn header="Estado">
                        <template #body="slotProps">
                            <cTag :value="getStateValue(slotProps.data)" :severity="getState(slotProps.data)"></cTag>
                        </template>
                    </cColumn>
                </DataTable>
            </template>
        </cCard>
    </div>
    <div class="flex2">
        <cCard class="custom-card">
            <template #title>Distancia Recorrida</template>
            <template #content>
                <div class="card-content">
                    <cChart type="line" :data="chartDistance" :options="chartOptions" class="h-30rem" />
                </div>
            </template>
        </cCard>
    </div>
    <div class="flex">
        <cCard>
            <template #title>Vehiculos</template>
            <template #content>
                <DataTable :value="vehicules" tableStyle="min-width: 50rem">
                    <cColumn field="id" header="No. de Registro"></cColumn>
                    <cColumn field="model_name" header="Modelo de Vehículo"></cColumn>
                    <cColumn field="license_plate" header="Matrícula"></cColumn>
                    <cColumn field="vin" header="VIN"></cColumn>
                    <cColumn field="device_name" header="Dispositivo Asociado"></cColumn>
                    <cColumn field="driver_name" header="Nombre Conductor"></cColumn>
                </DataTable>
            </template>
        </cCard>
    </div>
    <div class="flex">
        <cCard>
            <template #title>Dispositivos</template>
            <template #content>
                <DataTable :value="device" tableStyle="min-width: 50rem">
                    <cColumn field="id" header="No. de Registro"></cColumn>
                    <cColumn field="name" header="Nombre Dispositivo"></cColumn>
                    <cColumn field="imei" header="IMEI"></cColumn>
                    <cColumn field="fecha_obtencion" header="Fecha Compra"></cColumn>
                    <cColumn field="device_type_name" header="Tipo de Dispositivo"></cColumn>
                </DataTable>
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