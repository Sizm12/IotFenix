<script setup lang="ts">
import { ref, onMounted } from "vue";

const value = ref(70);

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    chartOptionsHorizontal.value = setChartOptionsHorizontal();
    ChartDataHorizontal.value = setChartDataHorizontal();
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
            <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
            <label for="ingredient1" class="ml-2">Hoy</label>
        </div>
        <div class="flex align-items-center">
            <RadioButton v-model="ingredient" inputId="ingredient2" name="pizza" value="Mushroom" />
            <label for="ingredient2" class="ml-2">Ultima Semana</label>
        </div>
        <div class="flex align-items-center">
            <RadioButton v-model="ingredient" inputId="ingredient3" name="pizza" value="Pepper" />
            <label for="ingredient3" class="ml-2">Ultimo Mes</label>
        </div>
    </div>
    <cDivider></cDivider>
    <div class="flex">
        <cCard>
            <template #title>Recorrido en KM</template>
            <template #content>
                <div class="c-card">
                    <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="45" />
                    Mayor Recorrido
                </div>
            </template>
        </cCard>

        <cCard>
            <template #title>Combustible Gastado</template>
            <template #content>
                <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="30" />
                Maximo Combustible Gastado
            </template>
        </cCard>

        <cCard>
            <template #title>Velocidad Maxima</template>
            <template #content>
                <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="55" />
                Velocidad Maxima Alcanzada
            </template>
        </cCard>
    </div>

    <div class="flex">
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
    </div>

    <div>
        <cCard>
            <template #title>Kilometros Recorridos</template>
            <template #content>
                <cChart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
            </template>
        </cCard>
    </div>

    <div>
        <cCard>
            <template #title>Combustible Consumido</template>
            <template #content>
                <cChart type="bar" :data="chartData" :options="chartOptions" class="h-30rem" />
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