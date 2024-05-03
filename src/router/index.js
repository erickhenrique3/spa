import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    { path: "/", component: () => import('../view/Capa.vue') },
    { path: "/login", component:() => import('../view/Login.vue') },
    { path: "/cadastro", component: () => import('../view/Cadastro.vue')},
    { path: "/principal", component:() => import('../view/Principal.vue') },
];


const router = createRouter(
    {
        history: createWebHashHistory(),
        routes,
    })


export default router;
