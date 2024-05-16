<template>
    <div>
        <div class="card">
            <cToolbar class="mb-4">
                <template #start>
                    <CustomButton label="Agregar Dispositivo" icon="pi pi-plus" severity="success" class="mr-2"
                        @click="openNew" />
                </template>
            </cToolbar>

            <DataTable ref="dt" :value="devices" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} Dispositivos">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h3 class="m-0">Administrar Dispositivos</h3>
                        <InputGroup iconPosition="left">
                            <InputGroupAddon>
                                <i class="pi pi-search" />
                            </InputGroupAddon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar" />
                        </InputGroup>
                    </div>
                </template>

                <cColumn selectionMode="multiple" style="width: 3rem" :exportable="false"></cColumn>
                <cColumn field="name" header="Nombre" sortable style="min-width:16rem"></cColumn>
                <cColumn field="imei" header="IMEI" sortable style="min-width:12rem"></cColumn>
                <cColumn field="device_type_name" header="Tipo de Dispositivo" sortable style="min-width:10rem">
                </cColumn>
                <cColumn field="fecha_obtencion" header="Fecha de Compra" sortable style="min-width:10rem"></cColumn>
                <cColumn :exportable="false" style="min-width:8rem">
                    <template #body="slotProps" >
                        <div style="display:flex; gap:5px;" >
                            <CustomButton icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editProduct(slotProps.data)" />
                        <CustomButton icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteProduct(slotProps.data)" />
                        </div>
                    </template>
                </cColumn>
            </DataTable>
        </div>

        <DialogVue v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle del Dispositivo"
            :modal="true" class="p-fluid">
            <TabView>
                <TabPanel header="Información del Dispositivo">
                    <div class="formcont" style="display:flex; flex-direction:column; gap:15px;" >
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nombre" class="font-semibold w-6rem">Nombre</label>
                            <InputText size="small" id="nombre" v-model="device.name" class="flex-auto"
                                autocomplete="off" :class="{ 'p-invalid': submitted && !device.name }"  />
                                <small v-if="submitted && !device.name" class="p-error">El nombre es requerido.</small>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">IMEI</label>
                            <InputText size="small" id="address" v-model="device.imei" class="flex-auto"
                                autocomplete="off" :class="{ 'p-invalid': submitted && !device.imei }" />
                            <small v-if="submitted && !device.imei" class="p-error">IMEI es requerido.</small>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Identificador</label>
                            <InputText size="small" id="address" v-model="device.flespi_id" class="flex-auto"
                                autocomplete="off" :class="{ 'p-invalid': submitted && !device.flespi_id }" />
                            <small v-if="submitted && !device.flespi_id" class="p-error">Identificador es requerido.</small>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Fabricante</label>
                            <DropDown size="small" id="tipo" v-model="device.device_type" :options="type"
                                optionLabel="name" optionValue="value" placeholder="Marca" class="drop"
                                :class="{ 'p-invalid': submitted && !device.device_type }" />
                            <small v-if="submitted && !device.device_type" class="p-error">Fabricante es requerido.</small>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label class="font-semibold w-6rem">Fecha de Compra</label>
                            <Calendar v-model="device.fecha_obtencion" dateFormat="dd/mm/yy"
                            :class="{ 'p-invalid': submitted && !device.fecha_obtencion }" />
                            <small v-if="submitted && !device.fecha_obtencion" class="p-error">Fabricante es requerido.</small>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <div class="btncont" style="display:flex; gap:10px; width:100%" >
                <CustomButton size="small" severity="secondary" icon="pi pi-times" label="Cancelar"
                    @click="hideDialog()">
                </CustomButton>
                <CustomButton size="small" icon="pi pi-check" label="Crear" @click="save()"></CustomButton>
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
    GetTypeDevices();
    GetDevices();
});

const GetTypeDevices = async () => {
    try {
        const response = await httpService.GetTypeDeviceList();
        type.value = response
    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetDevices = async () => {
    try {
        const response = await httpService.GetDevices();
        devices.value = response;
    } catch (error) {
        console.log("Error: ", error)
    }
}

const type = ref();
const devices = ref();
const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const device = ref({})
const selectedProducts = ref();
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

const formattedDate = (date) => {
      if (!date) return ''; 
      const isoDate = date.toISOString().split('T')[0];
      return isoDate;
    }

const save = async () => {
    submitted.value = true;

    if (!device.value.name || !device.value.imei || !device.value.flespi_id || !device.value.fecha_obtencion || !device.value.device_type) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos', life: 3000 });
        return;
    }

    const date_format = formattedDate(device.value.fecha_obtencion)

    const data = {
        'name': device.value.name,
        'flespi_id': device.value.flespi_id,
        'imei': device.value.imei,
        'fecha_obtencion': date_format,
        'device_type': device.value.device_type,
    }

    const response = await httpService.CreateDevices('createDevice', data)
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Registro Creado', life: 3000 });
    productDialog.value = false;
    device.value = {};
    GetDevices();

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