// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from "@/components/LoginPage.vue";
import MainPage from '@/components/MainPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import LaundryPC from "@/components/student/laundry/LaundryPC.vue";
import StudyroomPC from "@/components/student/studyroom/StudyroomPC.vue";
import MyPage from "@/components/student/mypage/MyPage.vue"
import { useAuthStore } from '@/stores/authStore'
import AdminMain from '@/components/AdminMain.vue';
import NoticePC from '@/components/student/notice/NoticePC.vue';
import NoticeDetailPc from '@/components/student/notice/NoticeDetailPc.vue';
import AdminNoticePc from '@/components/admin/notice/AdminNoticePc.vue';
import AdminNoticeDetailPc from '@/components/admin/notice/AdminNoticeDetailPc.vue';
import AdminNoticeWritePc from '@/components/admin/notice/AdminNoticeWritePc.vue';
import ComplainPc from '@/components/student/complain/ComplainPc.vue';
import ComplainDetailPc from '@/components/student/complain/ComplainDetailPc.vue';
import ComplainWritePc from '@/components/student/complain/ComplainWritePc.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LoginPage,
        meta: { hideHeader: true }
    },
    { path: '/main', name: 'MainPage', component: MainPage, meta: { roles: ['STUDENT'] }},
    { path: '/register', name: 'RegisterPage', component: RegisterPage, meta: { hideHeader: true }},
    // 필요한 경로 추가
    { path: '/stu/laundry', name: 'LaundryPC', component: LaundryPC},
    { path: '/stu/studyroom', name: 'StudyroomPC', component: StudyroomPC},
    { path: '/stu/mypage', name: 'MyPage', component: MyPage},
    { path: '/admin/', name: 'AdminMain', component: AdminMain, meta: { roles: ['ADMIN'] }},
    { path: '/stu/notice', name:'Notice', component: NoticePC},
    { path: '/stu/complain', name:'Complain', component: ComplainPc},
    { path: '/stu/complain/:id', name:'ComplainDetailPc', component: ComplainDetailPc},
    { path: '/stu/complain/write' , name: 'ComplainWritePc', component: ComplainWritePc},
    { path: '/stu/notice/:id', name:'NoticeDetailPc', component: NoticeDetailPc},
    { path: '/admin/notice' , name: 'AdminNoticePc', component: AdminNoticePc, meta: { roles: ['ADMIN'] }},
    { path: '/admin/notice/:id' , name: 'AdminNoticeDetailPc', component: AdminNoticeDetailPc, meta: { roles: ['ADMIN'] }},
    { path: '/admin/notice/write' , name: 'AdminNoticeWritePc', component: AdminNoticeWritePc, meta: { roles: ['ADMIN'] }}

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
  const userStore = useAuthStore()
  const userRole = userStore.role

  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    alert('접근 권한이 없습니다.')
    return false // 또는 return { path: '/' }
  }
  // next() 대신 return true 또는 아무것도 반환하지 않으면 라우팅이 계속됩니다.
  // Vue Router 4에서는 next() 대신 return 사용 권장
})

export default router
