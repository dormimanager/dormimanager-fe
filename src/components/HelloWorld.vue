<template>
  <div>
    <button @click="fetchTests">테이블 조회</button>
    <ul>
      <li v-for="item in testList" :key="item.id">
        {{ item.id }} - {{ item.name }}
      </li>
    </ul>
  </div>
  <div class="login-container">
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
