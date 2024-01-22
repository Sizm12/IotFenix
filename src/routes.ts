import ContendViewVue from './components/ContendView.vue'
import LoginViewVue from '../src/views/LoginView.vue'
import MisvehiculosViewVue from './views/MisvehiculosView.vue'

export const routes = [
    {
        path: '/',
        component: LoginViewVue
    },
    {
        path: '/Dashboard',
        component: ()=> import('../src/views/DashboardView.vue'),
        children:[
            {
                path:'General',
                component: ContendViewVue,
            },
            {
                path:'Vehiculos',
                component: MisvehiculosViewVue
            }
        ]
    }
]