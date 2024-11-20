import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomeView.vue';
import History from '../views/HistoryView.vue';

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
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;