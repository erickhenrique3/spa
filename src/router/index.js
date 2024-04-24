import { createRouter, createWebHashHistory } from "vue-router";
// import Capa from "../view/Capa.vue";
// import Login from "../view/Login.vue";
// import Cadastro from "../view/Cadastro.vue";
// import Principal from "../view/Principal.vue";

// const Capa = { template: "<div>Capa<div/>" };
// const Login = { template: "<div>Login<div/>" };
// const Cadastro = { template: "<div>Cadastro<div/>" };
// const Principal = { template: "<div>Principal<div/>" };

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
