<template>
    <Chart :options="chartOptions" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Chart } from "highcharts-vue";

const chartOptions = ref({
    chart: {
        type: "bar",
        width: 450, 
        height: 300,
        backgroundColor: 'transparent',
        
    },
    plotOptions: {
        series: {
            pointWidth: 30,
        }
    },
    title: {
        text: 'Tablero',
        style: {
            color: '#fff', // Color del texto del título
        }
    },
    yAxis: {
        title: {
            text: ' ',
            style: {
                color: '#fff', // Color del texto del título del eje Y
            }
        },
        tickPositions: [0, 25, 50, 75, 100],
        labels: {
            style: {
                color: '#fff', // Color del texto de los valores en el eje Y
            }
        }
    },

    series: [
        {
            name: " Nivel de Combustible ",
            data:[50],
            labe:{
                style: {
                    color: '#fff', // Color del texto de los valores en el eje Y
                }
            },
            style:{
                color: '#fff', // Color del texto de los valores en el eje Y
            }

        },
        {
            name: " Voltaje Bateria ",
            data:[25],
            labe:{
                style: {
                    color: '#fff', // Color del texto de los valores en el eje Y
                }
            }
        },
        {
            name: " Distancia recorida ",
            data:[80],
            labe:{
                style: {
                    color: '#fff', // Color del texto de los valores en el eje Y
                }
            }
        },
    ],
});

</script>