<template>
  <div>
    <button @click="fetchTests">테이블 조회</button>
    <ul>
      <li v-for="item in testList" :key="item.id">
        {{ item.id }} - {{ item.name }}
      </li>
    </ul>
  </div>
  <img src="@/assets/logo.png" alt="로고" class="logo" />
  <h1>기숙사 생활 관리 시스템</h1>
  <div class="login-container">
    <div class="input-section">
      <div class="input-group">
        <input
          v-model="loginData.studentId"
          type="text"
          placeholder="학번"
          class="input-box"
        />
        <input
          v-model="loginData.password"
          type="password"
          placeholder="비밀번호"
          class="input-box"
        />
      </div>
      <button class="login-btn" @click="handleLogin">LOGIN</button>
    </div>
    <div class="links">
      <a href="/register">회원가입</a> / <a href="#">비밀번호 찾기</a>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const testList = ref([])
const router = useRouter();
const loginData = ref({
  studentId: '',
  password: '',
});

const fetchTests = async () => {
  try {
    const response = await axios.get('/api/test')
    testList.value = response.data
  } catch (e) {
    alert('조회 실패')
  }
}

const handleLogin = async () => {
  // alert('로그인 성공!');
  // router.push('/main');
  try {
    console.log(loginData.value)
    const response = await axios.post('/api/auth/login', loginData.value);
    if (response.data.token) {
      const token = response.data.token // 서버에서 { token: '...' } 형태로 응답한다고 

      // 토큰에서 정보 분리
      const payload = token.split('.')[1]
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      const userInfo = JSON.parse(decoded)

      // Pinia에 저장
      authStore.setToken(token)
      authStore.setUserInfo({
      username: userInfo.sub,      // 예시: '홍길동'
      studentId: userInfo.studentId,
      role: userInfo.auth
      })
      // localStorage.setItem('token', response.data.token);
      router.push('/main');
    }
  } catch (error) {
    alert(error.response.data);
  }
};

</script>

<style scoped>
.login-container {
  width: 280px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-section {
  display: flex;
  gap: 10px;
  align-items: center;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.input-box {
  width: 150px;
  height: 36px;
  padding: 6px 10px;
  border: 2px solid #aaa;
  border-radius: 2px;
  font-size: 16px;
}
.login-btn {
  width: 80px;
  height: 113px;
  background: #b3e5fc;
  border: none;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}
.links {
  margin-top: 15px;
  font-size: 15px;
  color: #333;
}
.links a {
  color: #333;
  text-decoration: none;
  margin: 0 2px;
}
</style>