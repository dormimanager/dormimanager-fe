<template>
  <div class="user-card">
    <div class="user-info">
      <img class="avatar" :src="user.imgUrl" alt="프로필" />
      <div class="details">
        <div class="name">{{ user.name }} | {{ grade }}</div>
        <div class="major">{{ user.major }}</div>
        <button class="edit-btn" @click="mypage" >개인 정보 수정</button>
      </div>
    </div>
    <div class="user-stats">
      <div class="stat">
        <img class="icon" src="@/assets/logo.png" alt="예약" />
        <span>예약</span>
        <span class="count">{{ reservationCount }}</span>
      </div>
      <div class="divider"></div>
      <div class="stat">
        <img class="icon" src="@/assets/logo.png" alt="택배" />
        <span>택배</span>
        <span class="count">{{ deliveryCount }}</span>
      </div>
    </div>
  </div>
  <button @click="laundry">세탁</button>
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
const username = authStore.username
console.log(token)
console.log(username)
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


function laundry() {
  router.push('/member/laundry')
}function mypage() {
  router.push('/member/mypage')
}
</script>

<style>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}



/*개인정보*/
.user-card {
  display: flex;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 18px 22px;
  align-items: center;
  background: #fff;
  width: 420px;
  box-sizing: border-box;
}

.user-info {
  flex: 1;
  display: flex;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
  background: #f5f5f5;
}

.details {
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.name {
  font-weight: bold;
  font-size: 1.1rem;
}

.major {
  color: #444;
  font-size: 0.98rem;
}

.edit-btn {
  margin-top: 3px;
  padding: 4px 10px;
  background: #eee;
  border: none;
  border-radius: 4px;
  color: #333;
  font-size: 0.93rem;
  cursor: pointer;
  transition: background 0.2s;
}
.edit-btn:hover {
  background: #d6eaff;
}

.user-stats {
  background: #aee6fa;
  border-radius: 8px;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
  margin-left: 20px;
  gap: 16px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 500;
}

.icon {
  width: 26px;
  height: 26px;
}

.count {
  margin-left: 8px;
  font-size: 1.2rem;
  font-weight: bold;
}

.divider {
  width: 90%;
  height: 1px;
  background: #fff;
  margin: 4px 0;
  border-radius: 1px;
  opacity: 0.7;
}
/*개인정보*/
</style>
