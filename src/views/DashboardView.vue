<script setup lang="ts">
import { ref } from 'vue';
import FooterView from '@/components/FooterView.vue';

import { useToast } from "primevue/usetoast";

const isMenuVisible = ref(false);
const isWidthChanged = ref(false);
const selectedItem = ref('Home');
const profileImageUrl = 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais';
const logoUrl = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=322,fit=crop,q=95/YZ978xNPGMsMRZ5P/white-isotipo-dOq7DM3R33CNkjBx.png'
const title = 'FENIX';

const toast = useToast();

const openMenu = () => {
    isMenuVisible.value = true;
};

const closeMenu = () => {
    isMenuVisible.value = false;
    isWidthChanged.value = false;
};

const toggleMenuWidth = () => {
    isWidthChanged.value = !isWidthChanged.value;
};

const selectItem = (item: string) => {
    selectedItem.value = item;
    isMenuVisible.value = false;
};

const closeSession = () => {
    localStorage.clear();
}

// Moved useConfirm inside setup
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();

const confirmAction = () => {
    confirm.require({
        message: 'Seguro de cerrar sesión?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancelar',
        acceptLabel: 'Cerrar Sesión',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Hasta pronto..', detail: '', life: 3000 });
            closeSession();
            window.location.reload();
            window.location.href = '/';
        },
        reject: () => { }
    });
};

const op = ref();
const toggle = (event) => {
    op.value.toggle(event);
}

</script>

<template>
    <div class="menu-wrapper">
        <div class="sidebar-header">
            <div class="sideBar" :class="{ showMenu: isMenuVisible, widthChange: isWidthChanged }">
                <div>
                    <img :src="logoUrl">
                    <button class="close-button-mobile" v-if="isMenuVisible" @click="closeMenu">
                        <FA icon="xmark" style="font-size: 2rem;" />
                    </button>
                </div>
                <ul>
                    <RouterLink to="/Dashboard/General" style="text-decoration: none;">
                        <li routerLinkActive="router-link-active" :class="{ selected: selectedItem === 'Home' }"
                            @click="selectItem('Home')">
                            <i class="pi pi-home" style="color: #34d399;"></i><label>Dashboard</label>
                        </li>
                    </RouterLink>

                    <RouterLink to="/Dashboard/Tablero" style="text-decoration: none;">
                        <li @click="selectItem('Tablero')">

                            <i class="fas fa-table" style="color: #34d399;"></i><label>Tablero</label>
                        </li>
                    </RouterLink>
                    <RouterLink to="/Dashboard/TrackIt" style="text-decoration: none;">
                        <li @click="selectItem('TrackIt')">
                            <i class="pi pi-map" style="color: #34d399;"></i><label>Seguimiento</label>
                        </li>
                    </RouterLink>
                    <RouterLink to="/Dashboard/Reporte"  style="text-decoration: none;" >
                        <li @click="selectItem('Reporte')">
                            <i class="pi pi-chart-line" style="color: #34d399;"></i><label>Reporte</label>
                        </li>
                    </RouterLink>
                    <RouterLink to="/Dashboard/Vehiculos" style="text-decoration: none;">
                        <li @click="selectItem('Vehiculos')">
                            <i class="pi pi-car" style="color: #34d399;"></i><label>Vehiculos</label>
                        </li>
                    </RouterLink>
                    <RouterLink to="/Dashboard/Modelos" style="text-decoration: none;">
                        <li @click="selectItem('Modelos')">
                            <i class="far fa-bookmark" style=" color: #34d399;"></i>
                            <label>Modelos</label>
                        </li>
                    </RouterLink>
                    <RouterLink to="/Dashboard/Conductores" style="text-decoration: none;">
                        <li @click="selectItem('Conductores')">
                            <i class="pi pi-user" style="color: #34d399;"></i><label>Conductores</label>
                        </li>
                    </RouterLink>
                    <RouterLink to="/Dashboard/Dispositivos" style="text-decoration: none;">
                        <li @click="selectItem('Dispositivos')">
                            <i class="pi pi-box" style="color:#34d399;"></i>
                            <label>Dispositivos</label>
                        </li>
                    </RouterLink>
                    <RouterLink to="/Dashboard/Usuarios" style="text-decoration: none;">
                        <li @click="selectItem('Usuarios')">
                            <i class="pi pi-users" style="color: #34d399;"></i><label>Usuarios</label>
                        </li>
                    </RouterLink>
        
                    <li @click="confirmAction()" style="cursor: pointer;">
                        <i class="pi pi-sign-out" style="color: #34d399;"></i><label>Cerrar Sesión</label>
                    </li>

                </ul>
                <span class="cross-icon" @click="closeMenu"><i class="fas fa-times"></i></span>
            </div>
            <div class="backdrop" v-if="isMenuVisible" @click="closeMenu"></div>
            <div class="content">
                <header>
                    <div class="menu-button" id="desktop" @click="toggleMenuWidth">
                        <li class="pi pi-bars" style="font-size: 2rem;"></li>
                    </div>
                    <div class="menu-button" id="mobile" @click="openMenu">
                        <li class="pi pi-bars" style="font-size: 2rem;"></li>
                    </div>

                    <h1>{{ title }}</h1> <img :src="profileImageUrl" @click="toggle" style="cursor: pointer;" />
                </header>
                <div class="content-data">
                    <Toast />
                    <ConfirmDialog></ConfirmDialog>
                    <RouterView></RouterView>
                    <FooterView></FooterView>
                </div>
            </div>
        </div>
    </div>
    <OverlayPanel ref="op">
        <div style="display: flex; flex-direction: column; gap: 15px; width: auto;">
            <h4>Mi cuenta</h4>
            <li style="cursor: pointer; width:100%;">
                <i class="fas fa-info" style="color: #34d399;"></i>  <label style="cursor:pointer;">Editar mi información</label>
            </li>

            <li style="cursor: pointer; width:100%;">
                <i class="fas fa-key" style="color: #34d399;"></i>  <label style="cursor:pointer;">Cambiar contraseña</label>
            </li>
            
            <li @click="confirmAction()" style="cursor: pointer; width:100%;">
                <i class="pi pi-sign-out" style="color: #34d399;"></i>  <label style="cursor:pointer;">Cerrar
                    Sesión</label>
            </li>
        </div>

    </OverlayPanel>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

* {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
}

body {
    overflow: hidden;
    font-family: 'Open Sans', sans-serif;
}

.sideBar {
    position: relative;
    z-index: 20;
    height: 100vh;
    width: 20%;
    color: white;
    background-color: #232A3A;
    transition: 0.3s ease-in-out;
}

.sideBar.widthChange {
    width: 10%;
    text-align: center;
}

.sideBar img {
    position: absolute;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.sideBar div {
    position: relative;
    height: 10vh;
    background-color: #232A3A;
    display: flex;
    justify-content: center;
    align-items: center;
}


.sideBar li {
    padding: 20px 20px 20px 10px;
    transition: 0.3s ease-in-out;
}

li label.hideMenuList {
    display: none;
}

li {
    color: white;
    text-decoration: none;
    list-style: none;
}

label {
    text-decoration: none;
}

.sideBar li i {
    margin-right: 8px;
}

.sideBar li:hover {
    background-color: #1C2230;
}

.selected {
    background-color: #1f2937;
}

.sideBar span {
    position: absolute;
    color: #ffffff;
    top: 20px;
    right: 20px;
}

.sideBar .cross-icon {
    display: none;
    color: #001629;
}

.sidebar-header {
    display: flex;
}

.content {
    width: 100%;
    height: 100vh;
}

header {
    background-color: #232A3A;
    height: 10%;
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#mobile {
    display: none;
}


.menu-button {
    position: relative;
    cursor: pointer;
    width: 30px;
    height: 30px;
}

.menu-button div:nth-child(1) {
    position: absolute;
    height: 4px;
    border-radius: 20px;
    background-color: #c7c7c7;
    width: 100%;
}

.menu-button div:nth-child(2) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 4px;
    border-radius: 20px;
    background-color: #c7c7c7;
    width: 80%;
}

.menu-button div:nth-child(3) {
    position: absolute;
    height: 4px;
    border-radius: 20px;
    bottom: 0;
    background-color: #c7c7c7;
    width: 100%;
}

header img {
    height: 40px;
    border-radius: 100%;
}


.content-data {

    padding: 0px 10px;
    height: 86%;
    overflow-y: auto;
}

.sideBar.showMenu {
    left: 0;
}

.close-button-mobile {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #ffffff;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}


::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #1c2230;
}

::-webkit-scrollbar-thumb {
    background: #173F50;
}

RouterLink {
    color: #ffffff;
    text-decoration: none;
}

@media(max-width:1200px) {
    .sideBar {
        width: 30%;
    }
}

@media(max-width:900px) {
    #desktop {
        display: none;
    }

    .close-button-mobile {
        display: block;
    }

    #mobile {
        display: block;
    }

    .sideBar {
        position: absolute;
        width: 30%;
        top: 0;
        left: -100%;
    }

    .sideBar .cross-icon {
        display: block;
    }

    .backdrop {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.4);
        top: 0;
        left: -100%;
        height: 100vh;
        width: 100%;
    }

    .backdrop.showBackdrop {
        left: 0;
    }
}

@media(max-width:700px) {
    .sideBar {
        width: 40%;
    }
}

@media(max-width:400px) {
    .sideBar {
        width: 60%;
    }

    header h1 {
        font-size: 20px;
    }

    #mobile {
        height: 25px;
    }
}

@media(max-width:320px) {
    .sideBar {
        width: 80%;
    }
}

li {
    text-decoration: none;
}

RouterLink {
    text-decoration: none;
}

label {
    text-decoration: none;
}
</style>