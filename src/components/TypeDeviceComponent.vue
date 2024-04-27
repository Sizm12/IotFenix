<template>
    <div>
        <div class="card">
            <cToolbar class="mb-4">
                <template #start>
                    <CustomButton label="Agregar Tipo de Dispositivo" icon="pi pi-plus" severity="success" class="mr-2"
                        @click="openNew" />
                </template>
            </cToolbar>

            <DataTable ref="dt" :value="typedevices" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} Marcas">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h3 class="m-0">Administrar Tipos de Dispositivos</h3>
                        <InputGroup iconPosition="left">
                            <InputGroupAddon>
                                <i class="pi pi-search" />
                            </InputGroupAddon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar" />
                        </InputGroup>
                    </div>
                </template>

                <cColumn field="name" header="Nombre" sortable style="min-width:16rem"></cColumn>
                <cColumn field="proveedor" header="Proveedor" sortable style="min-width:12rem"></cColumn>
                <cColumn field="modelo" header="Modelo" sortable style="min-width:10rem"></cColumn>
                <!-- <cColumn :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <CustomButton icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editProduct(slotProps.data)" />
                        <CustomButton icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </cColumn> -->
            </DataTable>
        </div>

        <DialogVue v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle del Dispositivo"
            :modal="true" class="p-fluid">
            <TabView>
                <TabPanel header="Información del Dispositivo">
                    <div class="formcont" style="display:flex; flex-direction:column; gap:15px;" >
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nombre" class="font-semibold w-6rem">Nombre</label>
                            <InputText size="small" id="nombre" v-model="type.name" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Proveedor</label>
                            <InputText size="small" id="address" v-model="type.proveedor" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="id" class="font-semibold w-6rem">Modelo</label>
                            <InputText size="small" id="vat" v-model="type.modelo" class="flex-auto" autocomplete="off" />
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <div class="btncont" style="display:flex; gap:10px; width:100%" >
                <CustomButton size="small" severity="secondary" icon="pi pi-times" label="Cancelar" @click="hideDialog()"></CustomButton>
                <CustomButton size="small" icon="pi pi-check" label="Crear" @click="save()"></CustomButton>
            </div>
        </DialogVue>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { httpService } from '@/services/https.services';

onMounted(() => {
    GetDevices();
});

const GetDevices = async () => {
    try {
        const response = await httpService.GetTypeDevices();
        typedevices.value = response;
    } catch (error) {
        console.log("Error: ", error)
    }
}

const toast = useToast();
const dt = ref();
const typedevices = ref();
const productDialog = ref(false);
const product = ref({});
const type = ref({});
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

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
        'name': type.value.name,
        'proveedor': type.value.proveedor,
        'modelo': type.value.modelo,
    }

    const response = await httpService.CreateTypeDevices('createDeviceType', data)
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Registro Creado', life: 3000 });
    productDialog.value = false;
    type.value = {};
    GetDevices();

};


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