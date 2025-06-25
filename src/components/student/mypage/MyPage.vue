<template>
  <div class="container">
    <h2>개인 정보 수정</h2>
    <div class="profile-row">
      <div class="profile-img-box">
        <div class="profile-img">
          <img referrerpolicy="no-referrer" :src="user.imgUrl" alt="프로필 사진" class="profile-img" />
        </div>
      </div>
      <button class="btn" @click="changeProfile">변경</button>
      <input type="file" ref="fileInput" style="display:none" @change="onImageChange" accept="image/*" />
    </div>
    <table class="info-table">
      <tr>
        <td>이름</td>
        <td>{{ user.name }}</td>
      </tr>
      <tr>
        <td>학번</td>
        <td><b>{{ user.studentId }}</b></td>
      </tr>
      <tr>
        <td>학과</td>
        <td>{{ user.major }}</td>
      </tr>
      <tr>
        <td>성별</td>
        <td>{{ user.gender }}</td>
      </tr>
      <tr>
        <td>이메일</td>
        <td>
          <input class="input" v-model="user.email"/>
        </td>
      </tr>
      <tr>
        <td>전화번호</td>
        <td>
          <input class="input" v-model="user.phone"/>
        </td>
      </tr>
    </table>
    <div class="btn-row">
      <button class="btn" @click="cancel">취소</button>
      <button class="btn" @click="submit">수정</button>
    </div>
  </div>
</template>

<script setup>

import { ref, reactive } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios' 
import { useAuthStore } from '@/stores/authStore'
import logoImg from '@/assets/logo.png'
import { useRouter } from 'vue-router'

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
      console.log(response.data)
      Object.assign(user, response.data)
       // 이미지 URL이 null이면 logo.png 사용
    //   user.imgUrl = response.data.imgUrl || logoImg
      user.imgUrl = response.data.imgUrl
  ? `${apiUrl}${response.data.imgUrl}`
  : logoImg
  console.log(user.imgUrl)
      if(user.gender === 'M'){
        user.gender = '남자'
      }
      else{
        user.gender = '여자'
      }

    } catch (error) {
      console.error('학생 정보 조회 실패:', error)
    }
  }
})

const fileInput = ref(null)
const selectedFile = ref(null) // 선택된 파일 저장

const changeProfile = () => {
  fileInput.value.click()
}
const onImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    // 미리보기
    user.imgUrl = URL.createObjectURL(file)
  }
}
const cancel = () => {
  // 취소 동작
  router.go();
}
const submit = async () => {
  try {
    // FormData 생성
    const formData = new FormData()
    formData.append('studentId', user.studentId)
    // 이미지 파일이 있으면 추가
    if (selectedFile.value) {
      formData.append('profileImage', selectedFile.value)
    }
    // 기타 정보도 추가 가능
    formData.append('email', user.email)
    formData.append('phone', user.phone)

    // 수정 요청
    const response = await axios.put('/api/auth/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response)
    alert('수정되었습니다.')
    router.go();
    // 필요시 화면 갱신
  } catch (error) {
    console.error('수정 실패:', error)
    alert('수정에 실패했습니다.')
  }
}
</script>

<style scoped>
.container {
  max-width: 420px;
  margin: 24px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px #eee;
  padding: 32px 24px;
  text-align: center;
}
h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
}
.profile-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  gap: 16px;
}
.profile-img-box {
  display: flex;
  align-items: center;
}
.profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1.5px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafbfc;
  font-size: 1.1rem;
  color: #888;
  font-weight: 500;
  text-align: center;
  line-height: 1.2;
}
.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 32px;
}
.info-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #f3f3f3;
  font-size: 1rem;
  text-align: left;
}
.info-table tr td:first-child {
  width: 90px;
  color: #666;
}
.info-table tr td:last-child {
  text-align: left;
}
.input {
  width: 180px;
  padding: 6px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 8px;
  background: #f8fafd;
}
.btn {
  background: #bfe6fa;
  color: #222;
  border: none;
  border-radius: 6px;
  padding: 7px 18px;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 4px;
  margin-right: 4px;
  transition: background 0.2s;
}
.btn:hover {
  background: #a6d8f3;
}
.btn-row {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
