<template>
    <div class="flex">
        <h2>Mis Conductores</h2>
    </div>
    <cDivider></cDivider>
    <div>
        <div class="card">
            <cToolbar class="mb-4">
                <template #start>
                    <CustomButton label="Agregar Conductor" icon="pi pi-plus" severity="success" class="mr-2"
                        @click="openNew" />
                </template>
            </cToolbar>

            <DataTable ref="dt" :value="drivers" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} Conductores">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h3 class="m-0">Administrar Conductores</h3>
                        <InputGroup iconPosition="left">
                            <InputGroupAddon>
                                <i class="pi pi-search" />
                            </InputGroupAddon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar" />
                        </InputGroup>
                    </div>
                </template>

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
        </div>

        <DialogVue v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle del Conductor"
            :modal="true" class="p-fluid">
            <TabView>
                <TabPanel header="Información del Conductor">
                    <div class="formcont" style="display:flex; flex-direction:column; gap:15px;" >
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nombre" class="font-semibold w-6rem">Nombre</label>
                            <InputText size="small" id="nombre" v-model="driver.name" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Dirección</label>
                            <InputText size="small" id="address" v-model="driver.address"  class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="id" class="font-semibold w-6rem">Identificación Fiscal</label>
                            <InputText size="small" id="vat" class="flex-auto" v-model="driver.vat"  autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nTelefono" class="font-semibold w-6rem">Número de teléfono</label>
                            <InputText size="small" id="nTelefono" v-model="driver.phone"  class="flex-auto" autocomplete="off" />
                        </div>

                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="creador" class="font-semibold w-6rem">Correo Electrónico</label>
                            <InputText size="small" id="email" v-model="driver.email"  class="flex-auto" autocomplete="off" />
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <div class="btncont" style="display:flex; gap:10px; width:100%" >
                <CustomButton size="small" severity="secondary" icon="pi pi-times" label="Cancelar" @click="hideDialog"></CustomButton>
                <CustomButton size="small" icon="pi pi-check" label="Crear" @click="save"></CustomButton>
            </div>
        </DialogVue>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '../services/ProductService';
import { httpService } from '@/services/https.services';

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
    GetDrivers();
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const driver = ref({})
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

const drivers = ref();

const GetDrivers = async () => {
    try {
        const response = await httpService.GetDrivers();
        drivers.value = response
    } catch (error) {
        console.log("Error: ", error)
    }
}

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const save = async () => {
    submitted.value = true;
    const data = {
        'name': driver.value.name,
        'email': driver.value.email,
        'phone': driver.value.phone,
        'vat': driver.value.vat,
        'street': driver.value.address,
        'street2': '',
        'city': ''
    }
    
    const response = await httpService.CreateDriver('createContact', data)
    console.log(response);
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Registro Creado', life: 3000 });
    productDialog.value = false;
    driver.value = {};
    GetDrivers();
};

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

</script>

<style scoped>
html {
    font-size: 14px;
}

body {
    font-family: var(--font-family);
    font-weight: normal;
    background: var(--surface-ground);
    color: var(--text-color);
    padding: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}

p {
    line-height: 1.75;
}
</style>