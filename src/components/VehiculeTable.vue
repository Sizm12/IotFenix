<template>
    <div>
        <div class="card">
            <cToolbar class="mb-4">
                <template #start>
                    <CustomButton label="Agregar Vehiculo" icon="pi pi-plus" severity="success" class="mr-2"
                        @click="openNew" />
                </template>
            </cToolbar>

            <DataTable ref="dt" :value="vehicules" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} vehículos">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h3 class="m-0">Administrar Vehiculos</h3>
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-search" />
                            </InputGroupAddon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar" />
                        </InputGroup>

                    </div>
                </template>

                <cColumn field="model_name" header="Modelo" sortable style="min-width:16rem"></cColumn>
                <!-- <cColumn header="Imagen">
                     <template #body="slotProps">
                        <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                            :alt="slotProps.data.image" class="border-round" style="width: 64px" />
                    </template>
                </cColumn> -->
                <cColumn field="driver_name" header="Conductor" sortable style="min-width:10rem"></cColumn>
                <cColumn field="device_name" header="Dispositivo Asociado" sortable style="min-width:10rem"></cColumn>
                <cColumn field="vin" header="VIN" sortable style="min-width:10rem"></cColumn>
                <cColumn field="license_plate" header="Matrícula" sortable style="min-width:10rem"></cColumn>
                <!-- <cColumn field="inventoryStatus" header="Status" sortable style="min-width:12rem">
                    <template #body="slotProps">
                        <cTag :value="slotProps.data.inventoryStatus"
                            :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </cColumn> -->
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

        <DialogVue v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle de Vehiculo"
            :modal="true" class="p-fluid">
            <TabView>
                <TabPanel header="Información">
                    <div class="formcont" style="display:flex; flex-direction:column; gap:15px;">
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Modelo</label>
                            <DropDown size="small" v-model="vehicule.selectedModel" :options="model" optionLabel="name"
                                optionValue="value" placeholder="Seleccione Modelo de Vehiculo" class="drop" required />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nombre" class="font-semibold w-6rem">Matricula</label>
                            <InputText size="small" v-model="vehicule.matricula" required class="flex-auto"
                                autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Conductor</label>
                            <DropDown size="small" id="tipo" v-model="vehicule.selectedDriver" required
                                :options="driver" optionLabel="name" optionValue="id" placeholder="Asignar Conductor"
                                class="drop" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="id" class="font-semibold w-6rem">VIN</label>
                            <InputText size="small" id="id" v-model="vehicule.vin" required class="flex-auto"
                                autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="creador" class="font-semibold w-6rem">Dispositivo Asociado</label>
                            <DropDown size="small" id="creador" v-model="vehicule.selectedDevice" :options="device"
                                optionLabel="name" optionValue="value" placeholder="Dispositivo Asociado"
                                class="drop" />
                        </div>
                    </div>

                </TabPanel>
            </TabView>
            <div style="display:flex; gap:10px; width:100%">
                <CustomButton size="small" severity="secondary" icon="pi pi-times" label="Cancelar" @click="hideDialog">
                </CustomButton>
                <CustomButton size="small" icon="pi pi-check" label="Guardar" @click="Save"></CustomButton>
            </div>
        </DialogVue>

        <DialogVue v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirmación"
            :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">¿Está seguro de borrar el registro <b>{{ vehicules.model_name }}</b>?</span>
            </div>
            <template #footer>
                <CustomButton label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <CustomButton label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </DialogVue>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { httpService } from '@/services/https.services';

const model = ref()
const driver = ref()
const device = ref()
const vehicules = ref();


onMounted(() => {
    GetModelsList();
    GetDeviceList();
    GetDriversList();
    GetVehicules();
});

const GetVehicules = async () => {
    try {
        const response = await httpService.GetVehicule('getVehicule');
        vehicules.value = response

    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetModelsList = async () => {
    try {
        const response = await httpService.GetModelList();
        model.value = response
    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetDriversList = async () => {
    try {
        const response = await httpService.GetDriverList();
        driver.value = response
        console.log(response);

    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetDeviceList = async () => {
    try {
        const response = await httpService.GetDeviceList();
        device.value = response
    } catch (error) {
        console.log("Error: ", error)
    }
}

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const vehicule = ref({});
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};
const Save = async () => {
    submitted.value = true;

    const data = {
        'matricula': vehicule.value.matricula,
        'modelo': vehicule.value.selectedModel,
        'conductor': vehicule.value.selectedDriver,
        'vin': vehicule.value.vin,
        'dispositivo': vehicule.value.selectedDevice,

    }
    const response = await httpService.CreateVehicule('createFleet', data)
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Registro Creado', life: 3000 });
    productDialog.value = false;
    vehicule.value = {};
    GetVehicules();

    /* if (product.value.name.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        }
        else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    } */
};
const editProduct = (prod) => {
    product.value = { ...prod };
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
    products.value = products.value.filter(val => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter(val => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
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