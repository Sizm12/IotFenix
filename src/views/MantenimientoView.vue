<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '../services/ProductService';
import { httpService } from '@/services/https.services';

const models = ref([]);
const brands = ref([]);
const categories = ref([]);
const transmission = ref([
    { name: 'Manual', value: 'manual' },
    { name: 'Automático', value: 'automatic' }
]);
const MantenimientoType = ref([
    { name: 'Mantenimiento Preventivo', value: 'diesel' },
    { name: 'Mantenimiento correctivo', value: 'gasoline' },
]);
const columns = ref([
    { field: 'doors', header: 'No. de Puertas' },
    { field: 'seats', header: 'No. de Asientos' },
    { field: 'horsepower', header: 'Caballos de Fuerza' },
    { field: 'power', header: 'Potencia' },
    { field: 'color', header: 'Color' },
]);
const selectedColumns = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const dt = ref();
const products = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const model = ref({});
const selectedProducts = ref();
const submitted = ref(false);
const toast = useToast();

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
    GetModels();
    GetBrands();
    GetCategories();
});

const GetModels = async () => {
    try {
        const response = await httpService.GetModels();
        models.value = response;
    } catch (error) {
        console.log("Error al obtener los modelos: ", error);
    }
};

const GetBrands = async () => {
    try {
        const response = await httpService.GetBrandss();
        console.log("Marcas obtenidas: ", response); // Log para verificar los datos
        brands.value = response;
    } catch (error) {
        console.log("Error al obtener las marcas: ", error);
    }
};

const GetCategories = async () => {
    try {
        const response = await httpService.GetCategories();
        categories.value = response;
    } catch (error) {
        console.log("Error al obtener las categorías: ", error);
    }
};

const openNew = () => {
    model.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const Save = async () => {
    submitted.value = true;

    if (!model.value.name || !model.value.brand_id || !model.value.category_id || !model.value.default_fuel_type || !model.value.model_year || !model.value.transmission || !model.value.power || !model.value.color || !model.value.horsepower || !model.value.seats || !model.value.doors) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos', life: 3000 });
        return;
    }

    const data = {
        'name': model.value.name,
        'brand_id': model.value.brand_id,
        'category_id': model.value.category_id,
        'default_fuel_type': model.value.default_fuel_type,
        'model_year': model.value.model_year,
        'transmission': model.value.transmission,
        'power': model.value.power,
        'color': model.value.color,
        'horsepower': model.value.horsepower,
        'seats': model.value.seats,
        'doors': model.value.doors
    };
    console.log(data);

    try {
        await httpService.CreateModels('createModels', data);
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Registro Creado', life: 3000 });
        productDialog.value = false;
        model.value = {};
        GetModels();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el registro', life: 3000 });
    }
};

const deleteProduct = async () => {
    try {
        await httpService.DeleteModel('deleteModel', product.value.id);
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Modelo Borrado', life: 3000 });
        deleteProductDialog.value = false;
        GetModels();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al borrar el registro', life: 3000 });
    }
};

const onToggle = (val) => {
    selectedColumns.value = columns.value.filter(col => val.includes(col));
};
</script>

<template>
    <div>
        <div class="card">
            <cToolbar class="mb-4">
                <template #start>
                    <CustomButton label="Registar Mantenimiento" icon="pi pi-plus" severity="success" class="mr-2"
                        @click="openNew" />
                </template>
            </cToolbar>
            <br>
            <DataTable ref="dt" :value="models" v-model:selection="selectedProducts" resizableColumns
                columnResizeMode="fit" showGridlines dataKey="id" :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} para {last} de {totalRecords} modelos">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h3 class="m-0">Registros de Mantenimiento</h3>
                        <div class="col" style="display: flex; gap: 10px; width:100%;">
                            <InputGroup iconPosition="left">
                                <InputGroupAddon>
                                    <i class="pi pi-search" />
                                </InputGroupAddon>
                                <InputText v-model="filters['global'].value" placeholder="Buscar" />
                            </InputGroup>
                            <!-- <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="header"
                                @update:modelValue="onToggle" display="chip" placeholder="Seleccionar Columnas" /> -->
                        </div>
                    </div>
                </template>
                <cColumn header="Descripción" sortable style="min-width:10rem"></cColumn>
                <cColumn header="Nombre" sortable style="min-width:12rem"></cColumn>
                <cColumn header="Tipo de Servicio" sortable style="min-width:16rem"></cColumn>
                <cColumn header="Vehículo" sortable style="min-width:10rem">
                </cColumn>
                <cColumn header="Conductor" sortable style="min-width:10rem"></cColumn>
            </DataTable>
        </div>

        <DialogVue v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle de Modelo de Vehículo"
            :modal="true" class="p-fluid">
            <TabView>
                <TabPanel header="Información General">
                    <h3>Información General</h3>
                    <div class="formcont" style="display:flex; flex-direction:column; gap:15px;">
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Descripción</label>
                            <InputText size="small" id="nombre" v-model="model.name" class="flex-auto"
                                autocomplete="off" :class="{ 'p-invalid': submitted && !model.name }" />
                            <small v-if="submitted && !model.name" class="p-error">Descripción es requerida.</small>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nombre" class="font-semibold w-6rem">Nombre</label>
                            <InputText size="small" id="nombre" v-model="model.name" class="flex-auto"
                                autocomplete="off" :class="{ 'p-invalid': submitted && !model.name }" />
                            <small v-if="submitted && !model.name" class="p-error">Nombre es requerido.</small>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Tipo de Servicio</label>
                            <DropDown size="small" id="tipo" :options="MantenimientoType"
                                optionLabel="name" optionValue="value" placeholder="Tipo de Servicio" class="drop"
                                :class="{ 'p-invalid': submitted && !model.category_id }" />
                            <small v-if="submitted && !model.category_id" class="p-error">Tipo de Servicio es
                                requerido.</small>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nombre" class="font-semibold w-6rem">Vehículo</label>
                            <InputText size="small" id="nombre" v-model="model.seats" class="flex-auto"
                                autocomplete="off" :class="{ 'p-invalid': submitted && !model.seats }" />
                            <small v-if="submitted && !model.seats" class="p-error">Vehículo es requerido.</small>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="id" class="font-semibold w-6rem">Conductor</label>
                            <InputText size="small" id="id" v-model="model.doors" class="flex-auto" autocomplete="off"
                                :class="{ 'p-invalid': submitted && !model.doors }" />
                            <small v-if="submitted && !model.doors" class="p-error">Conductor es requerido.</small>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <div class="btncont" style="display:flex; gap:10px; width:100%">
                <CustomButton size="small" severity="secondary" icon="pi pi-times" label="Cancelar"
                    @click="hideDialog" />
                <CustomButton size="small" icon="pi pi-check" label="Crear" @click="Save" />
            </div>
        </DialogVue>

        <DialogVue v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirmación"
            :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">¿Está seguro de borrar el registro <b>{{ product.name }}</b>?</span>
            </div>
            <template #footer>
                <CustomButton label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <CustomButton label="Yes" icon="pi pi-check" text @click="deleteProduct" />
            </template>
        </DialogVue>

        <DialogVue v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <CustomButton label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <CustomButton label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </DialogVue>
    </div>
</template>

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

@media screen and (max-width: 767px) {
    .col {
        flex-direction: column;
    }
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