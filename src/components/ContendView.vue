<script setup lang="ts">
import { ref, onMounted } from "vue";

import CharBars from "@/components/CharBars.vue";
const value = ref(70);

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const getState = (state) => {
    switch (state.state) {
        case 'Activo':
            return 'success';
        case 'Inactivo':
            return 'danger';
        default:
            return 'success';
    }
}

const conductores = [
    {
        id: 1,
        name: 'Rafael Alcantara',
        vehiculo: 'Vehiculo 1',
        state: 'Activo',
    },
    {
        id: 2,
        name: 'Miguel Zuñiga',
        vehiculo: 'Vehiculo 2',
        state: 'Inactivo',
    },
    {
        id: 3,
        name: 'Jose Cardenas',
        vehiculo: 'Vehiculo 3',
        state: 'Activo',
    },
]

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
            <template #title>Conductores</template>
            <template #content>
                <div class="c-card">
                    <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="2" />
                    Conductores en Activo
                </div>
            </template>
        </cCard>

        <cCard>
            <template #title>Vehiculos Activos</template>
            <template #content>
                <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="2" />
                Vehiculos en Activo
            </template>
        </cCard>
        <cCard>
            <template #title>Vehiculos Inactivos</template>
            <template #content>
                <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="33%" />
                Vehiculos Inactivos
            </template>
        </cCard>
    </div>

    <div class="flex" style="height: 100%; width: 100%;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15615.355143606817!2d-86.15500415156954!3d11.91630540837058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f740459e2eeaf4b%3A0xcfba68d80c1c3d4a!2sMasatepe!5e0!3m2!1ses!2sni!4v1706207853372!5m2!1ses!2sni" width="100%" height="100%" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <div class="flex">
        <cCard>
            <template #title>Conductores</template>
            <template #content>
                <DataTable :value="conductores" tableStyle="min-width: 50rem">
                    <cColumn field="id" header="No. de Registro"></cColumn>
                    <cColumn field="name" header="Nombre Conductor"></cColumn>
                    <cColumn field="vehiculo" header="Vehiculo Asignado"></cColumn>
                    <cColumn header="Estado">
                        <template #body="slotProps">
                            <cTag :value="slotProps.data.state" :severity="getState(slotProps.data)"></cTag>
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
                <DataTable :value="vehicles" tableStyle="min-width: 50rem">
                    <cColumn field="id" header="No. de Registro"></cColumn>
                    <cColumn field="title" header="Nombre Vehiculo"></cColumn>
                    <cColumn field="identification" header="Identificación"></cColumn>
                    <cColumn field="device" header="Dispositivo Asociado"></cColumn>
                    <cColumn header="Estado">
                        <template #body="slotProps">
                            <cTag :value="slotProps.data.state" :severity="getState(slotProps.data)"></cTag>
                        </template>
                    </cColumn>
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