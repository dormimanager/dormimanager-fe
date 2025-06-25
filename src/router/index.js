// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/components/LoginPage.vue";
import MainPage from '@/components/MainPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import LaundryPC from "@/components/student/laundry/LaundryPC.vue";
import StudyroomPC from "@/components/student/studyroom/StudyroomPC.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LoginPage,
        meta: { hideHeader: true }
    },
    { path: '/main', name: 'MainPage', component: MainPage},
    { path: '/register', name: 'RegisterPage', component: RegisterPage, meta: { hideHeader: true }},
    // 필요한 경로 추가
    { path: '/stu/laundry', name: 'LaundryPC', component: LaundryPC},
    { path: '/stu/studyroom', name: 'StudyroomPC', component: StudyroomPC},

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
