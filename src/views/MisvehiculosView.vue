<template>
    <div class="flex">
        <h2>Mis vehiculos</h2>
        <CustomButton @click="visible = true" size="small" icon="pi pi-plus" label="Agregar vehiculo"></CustomButton>
    </div>
    <cDivider></cDivider>

    <div class="cont">
        <CardVehiculo v-for="(vehicle, index) in vehicles" :key="index" :vehicle="vehicle" />
    </div>

    <DialogVue v-model:visible="visible" modal header="Agregar nueva unidad">
        <TabView>
            <TabPanel header="Basico">
                <h3>Basico</h3>
                <div class="formcont">
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="nombre" class="font-semibold w-6rem">Nombre</label>
                        <InputText size="small" id="nombre" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="tipo" class="font-semibold w-6rem">Tipo</label>
                        <DropDown size="small" id="tipo" v-model="selectedOption" :options="options" optionLabel="name"
                            placeholder="Tipos" class="drop" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="id" class="font-semibold w-6rem">Id único</label>
                        <InputText size="small" id="id" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="nTelefono" class="font-semibold w-6rem">Número de teléfono</label>
                        <InputText size="small" id="nTelefono" class="flex-auto" autocomplete="off" />
                    </div>

                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="creador" class="font-semibold w-6rem">Creador</label>
                        <DropDown size="small" id="creador" v-model="selectedCreador" :options="creador" optionLabel="name"
                            placeholder="Creador" class="drop" />
                    </div>
                </div>

            </TabPanel>
            <TabPanel header="Información del vehiculo">
                <h3>Parámetros generales</h3>
                <div class="formcont">
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="vin" class="font-semibold w-6rem">VIN</label>
                        <InputText size="small" id="vin" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="creador" class="font-semibold w-6rem">Tipo de vehiculo</label>
                        <CascadeSelect v-model="selectedCity" :options="countries" optionLabel="cname"
                            optionGroupLabel="name" :optionGroupChildren="['states', 'cities']" style="min-width: 14rem"
                            placeholder="Vehiculo" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="Marca" class="font-semibold w-6rem">Marca</label>
                        <InputText size="small" id="Marca" class="flex-auto" autocomplete="off" />
                    </div>
                    <div class="flex align-items-center gap-3 mb-3">
                        <label for="Modelo" class="font-semibold w-6rem">Modelo</label>
                        <InputText size="small" id="Modelo" class="flex-auto" autocomplete="off" />
                    </div>
                </div>
            </TabPanel>
        </TabView>
        <div class="btncont">
            <CustomButton size="small" severity="secondary" icon="pi pi-times" label="Cancelar"></CustomButton>
            <CustomButton size="small" icon="pi pi-check" label="Crear"></CustomButton>
        </div>
    </DialogVue>
</template>
  
<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
import CardVehiculo from '../components/CardVehiculo.vue'

const selectedOption = ref();
const options = ref([
    { name: 'Vehiculo', code: 'vh' },
    { name: 'Maquina de herramientas', code: 'mh' },
    { name: 'Contenedor', code: 'ct' },
]);

const selectedCreador = ref();
const creador = ref([
    { name: 'Usuario 1', code: 'vh' },

]);
const vehicles = [
    {
        id: 1,
        title: 'Vehiculo 1',
        icon: 'car',
        iconColor: '#34d399',
        details: [
            { icon: 'car-on', label: 'Motor:', value: 'Encendido' },
            { icon: 'gauge', label: 'Velocidad:', value: '30.49 kph' },
            { icon: 'car-battery', label: 'Bateria:', value: '80%' },
            { icon: 'bolt', label: 'Voltaje principal:', value: '13.80 V' },
            { icon: 'gas-pump', label: 'Combustible:', value: '61400.00 ml' },
        ],
    },

    {
        id: 2,
        title: 'Vehiculo 2',
        icon: 'truck',
        iconColor: '#34d399',
        details: [
            { icon: 'car-rear', label: 'Motor:', value: 'Apagado' },
            { icon: 'gauge', label: 'Velocidad:', value: '46.49 kph' },
            { icon: 'car-battery', label: 'Bateria:', value: '74%' },
            { icon: 'bolt', label: 'Voltaje principal:', value: '21.80 V' },
            { icon: 'gas-pump', label: 'Combustible:', value: '85100.00 ml' },
        ],
    },
    {
        id: 3,
        title: 'Vehiculo 3',
        icon: 'bus',
        iconColor: '#34d399',
        details: [
            { icon: 'car-on', label: 'Motor:', value: 'Encendido' },
            { icon: 'gauge', label: 'Velocidad:', value: '68.49 kph' },
            { icon: 'car-battery', label: 'Bateria:', value: '86%' },
            { icon: 'bolt', label: 'Voltaje principal:', value: '23.80 V' },
            { icon: 'gas-pump', label: 'Combustible:', value: '65100.00 ml' },
        ],
    },

];

const selectedCity = ref();
const countries = ref([
    {
        name: 'Transporte de carga',
        code: 'AU',
        states: [
            {
                cname: 'Camioneta',

            },
            {
                cname: 'Furgoneta',
            }
        ]
    },
    {
        name: 'Transporte de pasajeros',
        code: 'CA',
        states: [
            {
                cname: 'Motocicleta',
            },
            {
                cname: 'Minibús',
            }
        ]
    },
]);
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
  