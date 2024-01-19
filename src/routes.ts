
export const routes = [
    {
        path: '/',
      
        component: ()=> import('../src/views/LoginView.vue')
    },
    {
        path:'/Login',
   
        component: ()=> import('../src/views/HomeView.vue')
    },
    {
        path: '/Dashboard',
        component: ()=> import('../src/views/DashboardView.vue')
    }
]