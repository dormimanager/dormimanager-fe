<template>
<img src="@/assets/logo.png" alt="로고" class="logo" />
<h1>기숙사 생활 관리 시스템</h1>
<div class="register-container">
  <h1 class="title">회원가입</h1>
  <form class="form-grid">
    <!-- 왼쪽 컬럼 -->
    <div class="form-col">
      <label class="form-label">이름</label>
      <input v-model="name" type="text" placeholder="홍길동" class="form-input" />

      <label class="form-label">이메일</label>
      <div class="email-row">
        <input v-model="email" type="email" placeholder="hongil@example.com" class="form-input" />
        <button type="button" class="verify-btn">인증</button>
      </div>

      <label class="form-label">인증번호</label>
      <div class="email-row">
        <input v-model="verifyCode" type="text" class="form-input" />
        <button type="button" class="certify-btn">확인</button>
      </div>

      <label class="form-label">성별</label>
      <div class="gender-row">
        <label class="gender-label">
          <input type="radio" v-model="gender" value="남성" />
          <span class="custom-radio"></span> 남성
        </label>
        <label class="gender-label">
          <input type="radio" v-model="gender" value="여성" />
          <span class="custom-radio"></span> 여성
        </label>
      </div>
    </div>

    <!-- 오른쪽 컬럼 -->
    <div class="form-col">
      <label class="form-label">학번</label>
      <input v-model="studentId" type="text" placeholder="20250001" class="form-input" />

      <label class="form-label">전화번호</label>
      <input v-model="phone" type="text" placeholder="하이픈(-) 없이 입력" class="form-input" />

      <label class="form-label">비밀번호</label>
      <input v-model="password" type="password" placeholder="6자리 이상" class="form-input" />

      <label class="form-label">비밀번호 재입력</label>
      <input v-model="passwordConfirm" type="password" placeholder="6자리 이상" class="form-input" />

    </div>
  </form>
  <button class="register-btn" disabled>회원가입</button>
</div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const studentId = ref('')
const phone = ref('')
const verifyCode = ref('')
const gender = ref('')
</script>

<style scoped>
.register-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 0 20px;
}
.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 18px;
}
.form-grid {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-bottom: 24px;
}
.form-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
  min-width: 240px;
  align-items: flex-start; /* 왼쪽 정렬 */
}
.form-label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 4px;
  text-align: left; /* 왼쪽 정렬 */
  width: 100%;
}
.form-input {
  width: 100%;
  height: 36px;
  padding: 6px 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 15px;
  background: #fafafa;
  margin-bottom: 4px;
  text-align: left; /* 입력값 왼쪽 정렬 */
}
.email-row {
  display: flex;
  gap: 6px;
  align-items: center;
  width: 100%;
}
.verify-btn {
  height: 50px;
  width: 100px;
  background: #b3e5fc;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certify-btn {
  height: 50px;
  width: 100px;
  background: #b3e5fc;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gender-row {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 4px;
}
.gender-label {
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  gap: 6px;
}
.gender-label input[type="radio"] {
  accent-color: #b3e5fc;
  width: 20px;
  height: 20px;
}
.register-btn {
  width: 100%;
  height: 48px;
  background: #ededed;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 24px;
  margin-top: 18px;
  cursor: not-allowed;
  letter-spacing: 2px;
}
</style>

