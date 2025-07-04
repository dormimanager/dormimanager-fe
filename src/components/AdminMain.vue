<template>
  <button @click="laundry">세탁</button>
  <div>
    <p>조회하기</p>
    <div>
      <button @click="notice">공지사항</button>
      <button>민원</button>
    </div>
  </div>
</template>

<script setup>

import { reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios' 
import logoImg from '@/assets/logo.png'

const authStore = useAuthStore()
const router = useRouter()

const token = authStore.token
const studentId = authStore.studentId
let user = reactive({})
const apiUrl = process.env.VUE_APP_API_URL 

// 화면이 마운트될 때 API 호출
onMounted(async () => {
  if (studentId) {
    try {
      const response = await axios.get('/api/auth/getInfo', {
        params: { studentId },
        headers: { Authorization: `Bearer ${token}` }
      })
      // 응답 데이터 처리 (예: authStore에 저장)
      Object.assign(user, response.data)
       // 이미지 URL이 null이면 logo.png 사용
    //   user.imgUrl = response.data.imgUrl || logoImg
      user.imgUrl = response.data.imgUrl
      ? `${apiUrl}${response.data.imgUrl}`
      : logoImg
    } catch (error) {
      console.error('학생 정보 조회 실패:', error)
    }
  }
})

function notice() {
  router.push('/admin/notice')
}

function laundry() {
  router.push('/stu/laundry')
}
</script>

<style>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
