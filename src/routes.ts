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
import ModeloViewVue from './views/ModeloView.vue'

export const routes = [
    {
        path: '/',
        component: LoginViewVue
    },
    {
        path: '/Dashboard',
        component: () => import('../src/views/DashboardView.vue'),
        children: [
            {
                path: 'General',
                component: ContendViewVue,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            },
            {
                path: 'Vehiculos',
                component: MisvehiculosViewVue,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
                
            },
            {
                path: 'Modelos',
                component: ModeloViewVue,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            },
            {
                path: 'Seguimiento',
                component: RutasViewVue,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            },
            {
                path: 'Tablero',
                component: TableroViewVue,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            },
            {
                path: 'TrackIt',
                component: TrackItView,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            },
            {
                path: 'Conductores',
                component: ConductoresView,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            },
            {
                path: 'Dispositivos',
                component: DispositivosView,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            },
            {
                path: 'Usuarios',
                component: UsuariosView,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            },
            {
                path: 'Reporte',
                component: ReporteView,
                meta: {
                    requiresAuth: true,
                    roles:['Administrador', 'Supervisor', 'Operativo']
                }
            }

        ]
    }
]