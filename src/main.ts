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
import Dropdown from 'primevue/dropdown';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dialog from 'primevue/dialog';
import CascadeSelect from 'primevue/cascadeselect';
import SelectButton from 'primevue/selectbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Tooltip from 'primevue/tooltip';

import Toolbar from 'primevue/toolbar';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import RadioButton from 'primevue/radiobutton'

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes
});

app.directive('tooltip', Tooltip);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

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
app.component('DropDown', Dropdown);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('DialogVue', Dialog);
app.component('CascadeSelect', CascadeSelect);
app.component('SelectedButtom', SelectButton)
app.component('DataTable', DataTable);

app.component('cToolbar', Toolbar);
app.component('Toast', Toast);
app.component('Textarea', Textarea);
app.component('Calendar', Calendar);
app.component('RadioButton', RadioButton);


app.component('cColumn', Column);
app.component('cTag', Tag);
app.mount('#app');