<template>
    <Chart :options="chartOptions" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Chart } from "highcharts-vue";

const props = defineProps({
    titulo : String,
    name: String,
    data: String
})

const chartOptions = ref({
    chart: {
        type: "bar",
        width: 300, 
        height: 200,
        backgroundColor: 'transparent',
        
    },
    plotOptions: {
        series: {
            pointWidth: 30,
        }
    },
    title: {
        text: props.titulo || "",
        style: {
            color: '#fff', // Color del texto del título
        }
    },
    yAxis: {
        title: {
            text: 'aceleracion',
            style: {
                color: '#fff', // Color del texto del título del eje Y
            }
        },
        tickPositions: [0, 10, 20, 30, 40, 50],
        labels: {
            style: {
                color: '#fff', // Color del texto de los valores en el eje Y
            }
        }
    },

    series: [
        {
            name: props.name || "",
            data:[Number(props.data) || Number(props.data)],
            labe:{
                style: {
                    color: '#fff', // Color del texto de los valores en el eje Y
                }
            }
        },
    ],
});

</script>