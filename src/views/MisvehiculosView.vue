<template>
    <div class="flex">
        <h2>Mis vehiculos</h2>
        <!-- <CustomButton @click="visible = true" size="small" icon="pi pi-plus" label="Agregar vehiculo"></CustomButton> -->
    </div>
    <cDivider></cDivider>
<!-- 
    <div class="cont">
        <CardVehiculo v-for="(vehicle, index) in vehicles" :key="index" :vehicle="vehicle" />
    </div> -->

    <div>
        <VehiculeTable></VehiculeTable>
    </div>
</template>
  
<script setup lang="ts">
import VehiculeTable from "../components/VehiculeTable.vue";


</script>
  
<style scoped>
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cont {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding: 15px 0px;


    @media screen and (max-width: 767px) {
        grid-template-columns: repeat(1, 1fr);
    }
}

.p-card {
    padding: 10px;
    width: 100%;
}

.inline {
    display: flex;
    align-items: center;
    gap: 10px;
}

h4,
p {
    margin: 5px 0px;
}

.drop {
    width: 210px;
}

.formcont {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px
}

.btncont {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>
  