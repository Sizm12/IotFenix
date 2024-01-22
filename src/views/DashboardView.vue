<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import FooterView from '@/components/FooterView.vue';

interface Data {
    isMenuVisible: Ref<boolean>;
    isWidthChanged: Ref<boolean>;
    selectedItem: string;
    logoUrl: string;
    profileImageUrl: string;
    title: string;
}


const isMenuVisible = ref(false);
const isWidthChanged = ref(false);
const selectedItem = ref('Home');
const profileImageUrl = 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705622400&semt=ais';
const logoUrl = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=322,fit=crop,q=95/YZ978xNPGMsMRZ5P/white-isotipo-dOq7DM3R33CNkjBx.png'
const title = 'FENIX';


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
</script>

<template>
    <div class="menu-wrapper">
        <div class="sidebar-header">
            <div class="sideBar" :class="{ showMenu: isMenuVisible, widthChange: isWidthChanged }">
                <div>
                    <img :src="logoUrl">
                    <button class="close-button-mobile" v-if="isMenuVisible" @click="closeMenu">
                        <FA icon="xmark" style="font-size: 2rem;"/>
                    </button>
                </div>
                <ul>
                    <RouterLink to="/Dashboard/General">
                        <li routerLinkActive="router-link-active" :class="{ selected: selectedItem === 'Home' }"
                            @click="selectItem('Home')">
                            <i class="pi pi-home" style="color: #34d399;"></i><label>Dashboard</label>
                        </li>
                    </RouterLink>
                    <RouterLink to="/Dashboard/Vehiculos">
                        <li @click="selectItem('Vehiculos')">
                            <i class="pi pi-car" style="color: #34d399;"></i><label>Mis vehiculos</label>
                        </li>
                    </RouterLink>
                    <li @click="selectItem('Rutas')">
                        <i class="pi pi-map" style="color: #34d399;"></i><label>Rutas</label>
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
                    
                    <h1>{{ title }}</h1> <img :src="profileImageUrl" />
                </header>
                <div class="content-data">
                    <RouterView></RouterView>
                    <FooterView></FooterView>
                </div>
            </div>
        </div>
    </div>
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
    background-color: #34d399;
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
    width: 5px;
}

::-webkit-scrollbar-track {
    background: #1c2230;
}

::-webkit-scrollbar-thumb {
    background: #232A3A;
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
</style>