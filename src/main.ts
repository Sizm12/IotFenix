import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createRouter, createWebHistory } from 'vue-router'; // Import the necessary router functions
import { routes } from './routes';
import 'primevue/resources/themes/lara-dark-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

//icons
import { fas } from '@fortawesome/free-solid-svg-icons';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Chart from 'primevue/chart';
import Knob from 'primevue/knob';
import ProgressBar from 'primevue/progressbar';


const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes
});


app.use(router);
app.use(PrimeVue);

library.add(fas);

app.component('Check-Box', Checkbox);
app.component('CustomButton', Button);
app.component('cCard', Card);
app.component('cDivider', Divider);
app.component('InputText', InputText);
app.component('cPassword', Password);
app.component('cChart', Chart);
app.component('cKnob', Knob);
app.component('cProgressBar', ProgressBar);
app.component('FA', FontAwesomeIcon);
app.mount('#app');