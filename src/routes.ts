import ContendViewVue from './components/ContendView.vue'
import LoginViewVue from '../src/views/LoginView.vue'
import MisvehiculosViewVue from './views/MisvehiculosView.vue'
import RutasViewVue from './views/RutasView.vue'
import TableroViewVue from './views/TableroView.vue'
import TrackItView from './views/TrackItView.vue'
import ConductoresView from './views/ConductoresView.vue'
import DispositivosView from './views/DispositivosView.vue'
import ReporteView from './views/ReporteView.vue'
import UsuariosView from './views/UsuariosView.vue'

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
            },
            {
                path: 'Seguimiento',
                component: RutasViewVue
            },
            {
                path: 'Tablero',
                component: TableroViewVue
            },
            {
                path: 'TrackIt',
                component: TrackItView 
            },
            {
                path: 'Conductores',
                component: ConductoresView,
            },
            {
                path: 'Dispositivos',
                component: DispositivosView
            },
            {
                path: 'Usuarios',
                component: UsuariosView
            },
            {
                path: 'Reporte',
                component: ReporteView
            }
        
        ]
    }
]