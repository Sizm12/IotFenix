
export const routes = [
    {
        path: '/',
      
        component: ()=> import('../src/views/LoginView.vue')
    },
    {
        path: '/Dashboard',
        component: ()=> import('../src/views/DashboardView.vue')
    }
]