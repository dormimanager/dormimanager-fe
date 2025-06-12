<template>
  <div>
    <button @click="fetchTests">테이블 조회</button>
    <ul>
      <li v-for="item in testList" :key="item.id">
        {{ item.id }} - {{ item.name }}
      </li>
    </ul>
  </div>
  <!-- <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">아이디</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="아이디를 입력하세요"
        />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <button type="submit">로그인</button>
    </form>
  </div> -->
  <img src="@/assets/logo.png" alt="로고" class="logo" />
  <h1>기숙사 생활 관리 시스템</h1>
  <div class="login-container">
    <div class="input-section">
      <div class="input-group">
        <input
          v-model="studentId"
          type="text"
          placeholder="학번"
          class="input-box"
        />
        <input
          v-model="password"
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

const testList = ref([])
const router = useRouter();

const fetchTests = async () => {
  try {
    const response = await axios.get('/api/test')
    testList.value = response.data
  } catch (e) {
    alert('조회 실패')
  }
}

const handleLogin = () => {
  alert('로그인 성공!');
  router.push('/main');
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