import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomeView.vue';
import History from '../views/HistoryView.vue';
import AdminPage from '../views/AdminPage.vue'
import Products from '../views/products/ProductView.vue'
import ProductPage from "@/views/products/ProductPage.vue";

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
        component: AdminPage,
    },
    {
        path: '/products',
        name:'products',
        component: Products,
    },
    {
        path: '/products/:productId',
        name: 'productPage',
        component: ProductPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;