// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
import MainPage from '@/components/MainPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorld
    },
    { path: '/main', name: 'MainPage', component: MainPage },
    // 필요한 경로 추가
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
