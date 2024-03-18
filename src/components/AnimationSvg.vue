<template>
    <div style="height: 70%; width:100%; justify-content:center; align-items:center; display:flex; flex-direction:column; gap:20px;" >
        <h2>Selecione el vehiculo</h2>
        <img src="../assets/City-driver.svg" class="city-driver"/>
    </div>

</template>

<script setup lang="ts"></script>

<style>
.city-driver{
    width: 500px;
}

@media screen and (max-width: 767px) {
    .city-driver{
        width: 80%;
    }
}

</style>