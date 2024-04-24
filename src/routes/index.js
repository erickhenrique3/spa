import { createRouter, createWebHistory } from "vue-router";
import Capa from "@/components/Capa.vue";
import Login from "@/components/Login.vue";
import Cadastro from "@/components/Cadastro.vue";
import Principal from "@/components/Principal.vue";

// const Capa = { template: "<div>Capa<div/>" };
// const Login = { template: "<div>Login<div/>" };
// const Cadastro = { template: "<div>Cadastro<div/>" };
// const Principal = { template: "<div>Principal<div/>" };

const routes = [
    { path: "/", component: () => import('@/components/Capa.vue') },
    { path: "/login", component:() => import('@/components/Login.vue') },
    { path: "/cadastro", component: () => import('@/components/Cadastro.vue')},
    { path: "/principal", component:() => import('@/components/Principal.vue') },
];


const router = createRouter(
    {
        history: createWebHistory(),
        routes,
    })


export default router;
