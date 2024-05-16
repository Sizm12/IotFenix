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
                        <h3 class="m-0">Administrar Usuarios</h3>
                        <InputGroup iconPosition="left">
                            <InputGroupAddon>
                                <i class="pi pi-search" />
                            </InputGroupAddon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar" />
                        </InputGroup>
                    </div>
                </template>

                <cColumn field="name" header="Nombre" sortable style="min-width:16rem"></cColumn>
                <cColumn field="email" header="Correo Electrónico" sortable style="min-width:12rem"></cColumn>
                <cColumn field="last_authentication" header="Ultima Conexión" sortable style="min-width:12rem">
                </cColumn>
                <cColumn header="Estado" sortable style="min-width:12rem">
                    <template #body="slotProps">
                        <cTag :value="getStateValue(slotProps.data)" :severity="getState(slotProps.data)"></cTag>
                    </template>
                </cColumn>

            </DataTable>
        </div>

        <DialogVue v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle del Usuario"
            :modal="true" class="p-fluid">
            <TabView>
                <TabPanel header="Información del Dispositivo">
                    <div class="formcont" style="display:flex; flex-direction:column; gap:15px;">
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="nombre" class="font-semibold w-6rem">Nombre</label>
                            <InputText size="small" id="nombre" v-model="user.username" class="flex-auto"
                                autocomplete="off" :class="{ 'p-invalid': submitted && !user.username }" />
                            <small v-if="submitted && !user.username" class="p-error">Nombre es requerido.</small>
                        </div>
                        <div>
                            <div class="flex align-items-center gap-3 mb-3">
                                <label for="tipo" class="font-semibold w-6rem">Correo Electrónico</label>
                                <InputText size="small" id="email" v-model="user.email" class="flex-auto"
                                    autocomplete="off"
                                    :class="{ 'p-invalid': submitted && !isValidEmail(user.email) }" />
                                <small v-if="submitted && !isValidEmail(user.email)" class="p-error">Correo electrónico
                                    inválido.</small>
                            </div>
                            <div class="flex align-items-center gap-3 mb-3">
                                <label for="id" class="font-semibold w-6rem">Contraseña</label>
                                <InputText size="small" id="password" v-model="user.password" class="flex-auto"
                                    autocomplete="off"
                                    :class="{ 'p-invalid': submitted && !isValidPassword(user.password) }" />
                                <small v-if="submitted && !isValidPassword(user.password)" class="p-error">La contraseña
                                    debe
                                    contener al menos una letra mayúscula y un número.</small>
                            </div>
                        </div>
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="tipo" class="font-semibold w-6rem">Rol</label>
                            <DropDown size="small" id="tipo" v-model="user.rol_id" :options="roles" optionLabel="name"
                                optionValue="id" placeholder="Roles Disponibles" class="drop"
                                :class="{ 'p-invalid': submitted && !user.rol_id }" />
                            <small v-if="submitted && !user.rol_id" class="p-error">El rol es requerido.</small>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <div class="btncont" style="display:flex; gap:10px; width:100%">
                <CustomButton size="small" severity="secondary" icon="pi pi-times" label="Cancelar" @click="hideDialog">
                </CustomButton>
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
    console.log(users.value);
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

    if (!user.value.username || !user.value.email || !user.value.password || !user.value.rol_id) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos', life: 3000 });
        return;
    }

    const data = {
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

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const numberRegex = /\d/;
  return uppercaseRegex.test(password) && numberRegex.test(password);
};
const getState = (state) => {

    switch (state.state) {
        case 'active':
            return 'success';
        case 'inactive':
            return 'danger';
        default:
            return 'warning';
    }
}

const getStateValue = (state) => {

    switch (state.state) {
        case 'active':
            return 'Activo';
        case 'inactive':
            return 'Inactivo';
        default:
            return 'Nuevo';
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