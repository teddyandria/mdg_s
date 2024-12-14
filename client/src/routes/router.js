import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomeView.vue';
import History from '../views/HistoryView.vue';
import AdminPage from '../views/AdminPage.vue'
import Products from '../views/products/ProductView.vue'
import ProductPage from "@/views/products/ProductPage.vue";
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/loginView.vue";
import AlreadyConnected from "@/views/AlreadyConnected.vue";
import DashboardPage from "@/views/DashboardUserView.vue";

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
    {
        path: '/signup',
        name: 'signup',
        component: SignUp,
    },
    {
        path: '/login',
        name: 'login',
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem("token")) {
                next("/dashboard"); // Si un token existe, redirige l'utilisateur vers le dashboard
            } else {
                next();
            }
        },
        component: Login,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardPage
    },
    {
        path: "/already-connected",
        component: AlreadyConnected
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token"); // Vérifie si un token est présent

    if (to.path === "/login" && isAuthenticated) {
        next("/already-connected");
    } else if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;