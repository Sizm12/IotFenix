<template>
    <div class="flex">
        <h2>Mis Dispositivos</h2>
    </div>
    <cDivider></cDivider>
    <TabView>
        <TabPanel header="Administración de Dispositivo">
            <DeviceComponent />
        </TabPanel>
        <TabPanel header="Administración de Tipos de Dispositivo">
            <TypeDeviceComponent />
        </TabPanel>
    </TabView>

</template>

<script setup>
import DeviceComponent from '../components/DeviceComponent.vue';
import TypeDeviceComponent from '../components/TypeDeviceComponent.vue';
</script>
