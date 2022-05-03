import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import('../view/home/Home.vue'),
    },
    {
        path: "/blog/:id",
        name: "default",
        component: () => import('../view/template/default.vue'),
    },
    {
        path: "/blog/:style/:id",
        name: "template",
        component: () => import('../view/template/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;