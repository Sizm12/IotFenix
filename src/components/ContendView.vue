<script setup lang="ts">
import { ref, onMounted } from "vue";
import { httpService } from "@/services/https.services";

import CharBars from "@/components/CharBars.vue";
const value = ref(70);

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    GetDeviceList();
    GetDriversList();
    GetVehicules();
});

const chartData = ref();
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

const GetVehicules = async () =>{
    try {
        const response = await httpService.GetVehicule('getVehicule');
        vehicules.value = response
        vehiculeqty.value = vehicules.value.length
    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetDriversList = async () =>{
    try {
        const response = await httpService.GetDrivers();    
        driver.value = response
        driverqty.value = driver.value.length
    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetDeviceList = async () =>{
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

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--blue-500')
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderDash: [5, 5],
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--teal-500')
            },
            {
                label: 'Third Dataset',
                data: [12, 51, 62, 33, 21, 62, 45],
                fill: true,
                borderColor: documentStyle.getPropertyValue('--orange-500'),
                tension: 0.4,
                backgroundColor: 'rgba(255,167,38,0.2)'
            }
        ]
    };
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