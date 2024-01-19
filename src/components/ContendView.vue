<script setup lang="ts">
import { ref, onMounted } from "vue";

const value = ref(70);

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

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
            <template #title>Bateria</template>
            <template #content>
                <cKnob class="ind1" valueColor="#8c3df9" v-model="value" readonly :strokeWidth="8"
                    valueTemplate="{value}%" />
            </template>
        </cCard>

        <cCard>
            <template #title>Alterndor</template>
            <template #content>
                <cKnob v-model="value" valueColor="#F2b53C" :strokeWidth="8" readonly valueTemplate="{value}%" />
            </template>
        </cCard>
        <cCard>
            <template #title>Temperatura</template>
            <template #content>
                <cKnob v-model="value" valueColor="#3c79f2" :strokeWidth="8" readonly valueTemplate="{value}%" />
            </template>
        </cCard>

        <cCard>
            <template #title>Card</template>
            <template #content>
                <cProgressBar  style="height: 20px;" :value="50"></cProgressBar>
                <br>
                <cProgressBar style="height: 20px; " :value="70"></cProgressBar>
                <br>
                <cProgressBar style="height: 20px; " :value="30"></cProgressBar>
                <br>
                <cDivider></cDivider>
            </template>
        </cCard>
    </div>

    <div class="flex">

    </div>
    <div class="flex">
        <cCard>
            <template #title>Kpi</template>
            <template #content>
                <cChart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
            </template>
        </cCard>
        <cCard>
            <template #title>Kpi</template>
            <template #content>
            </template>
        </cCard>
        <cCard>
            <template #title>Kpi</template>
            <template #content>
                <cChart type="line" :data="chartData" :options="chartOptions" class="h-30rem" />
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
    padding:10px;
    width: 100%;
}

h2{
    margin: 15px;
}
</style>