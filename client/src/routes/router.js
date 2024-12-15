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
import ProductCartUser from "@/views/products/ProductCartUser.vue";
import OrderPage from "@/views/order/OrderPage.vue";
import {requireNoAuth} from "@/guards/authGuard";
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
        path: "/products/:categoryName",
        name: "ProductsByCategory",
        component: Products,
        props: true,
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp,
    },
    {
        path: '/login',
        name: 'login',
        beforeEnter: requireNoAuth,
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
    {
        path: "/cart",
        name: "Cart",
        component: ProductCartUser,
    },
    {
        path: "/order",
        name: "OrderPage",
        component: OrderPage,
    },
    {
        path: "/confirmation",
        name: "ConfirmationPage",
        component: () => import("@/views/order/ConfirmationPage.vue"),
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