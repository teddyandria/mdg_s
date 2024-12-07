import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomeView.vue';
import History from '../views/HistoryView.vue';
import AdminPage from '../components/ProductAdminForm.vue'
import ProductAdminForm from '../components/ProductAdminForm.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/history',
        name: 'history',
        component: History,
    },
    {
        path: '/admin',
        name:'admin',
        component: AdminPage
    },
    {
        path: '/products',
        name: 'products',
        component: ProductAdminForm,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;