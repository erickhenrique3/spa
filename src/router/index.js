import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    { path: "/", component: () => import('../view/CapaForm.vue') },
    { path: "/login", component:() => import('../view/LoginForm.vue') },
    { path: "/cadastro", component: () => import('../view/CadastroForm.vue')},
    { path: "/principal", component:() => import('../view/PrincipalTask.vue') },
];


const router = createRouter(
    {
        history: createWebHashHistory(),
        routes,
    })


export default router;
