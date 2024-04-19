<template>
    <div>
        <div class="card">
            <cToolbar class="mb-4">
                <template #start>
                    <CustomButton label="Agregar Usuario" icon="pi pi-plus" severity="success" class="mr-2"
                        @click="openNew" />
                </template>
            </cToolbar>

            <DataTable ref="dt" :value="users" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <h4 class="m-0">Administrar Usuarios</h4>
                        <IconField iconPosition="left">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar" />
                        </IconField>
                    </div>
                </template>

                <cColumn field="name" header="Nombre" sortable style="min-width:16rem"></cColumn>
                <cColumn field="email" header="Correo Electrónico" sortable style="min-width:12rem"></cColumn>
                <cColumn field="last_authentication" header="Ultima Conexión" sortable style="min-width:12rem">
                </cColumn>
                <cColumn field="state" header="Estado" sortable style="min-width:12rem"></cColumn>
                <cColumn :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <CustomButton icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editProduct(slotProps.data)" />
                        <CustomButton icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </cColumn>
            </DataTable>
        </div>

        <DialogVue v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle del Usuario"
            :modal="true" class="p-fluid">
            <TabView>
                <TabPanel header="Información del Dispositivo">
                    <div class="formcont">
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nombre" class="font-semibold w-6rem">Nombre</label>
                            <InputText size="small" id="nombre" v-model="user.username" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Correo Electronico</label>
                            <InputText size="small" id="address" v-model="user.email" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="id" class="font-semibold w-6rem">Contraseña</label>
                            <InputText size="small" id="vat" v-model="user.password" class="flex-auto" autocomplete="off" />
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Rol</label>
                            <DropDown size="small" id="tipo" v-model="user.rol_id" :options="roles"
                                optionLabel="name" optionValue="id" placeholder="Roles Disponibles" class="drop" />
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <div class="btncont">
                <CustomButton size="small" severity="secondary" icon="pi pi-times" label="Cancelar" @click="hideDialog"></CustomButton>
                <CustomButton size="small" icon="pi pi-check" label="Crear" @click="save"></CustomButton>
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

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '../services/ProductService';
import { httpService } from '@/services/https.services';

onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
    GetUsers();
    GetRoles();
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const user = ref({})
const selectedProducts = ref();
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const users = ref();
const roles = ref();
const GetUsers = async () => {
    try {
        const response = await httpService.GetUsers();
        users.value = response
    } catch (error) {
        console.log("Error: ", error)
    }
}

const GetRoles = async () => {
    try {
        const response = await httpService.GetRoles();
        roles.value = response
        console.log(roles);
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

    const data ={
        'username': user.value.username,
        'password': user.value.password,
        'email': user.value.email,
        'rol_id': user.value.rol_id,
    }

    const response = await httpService.CreateUser('createUser', data)
    console.log(response);
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Registro Creado', life: 3000 });
    productDialog.value = false;
    user.value = {};
    GetUsers();
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