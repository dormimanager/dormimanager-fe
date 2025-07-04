<template>
  <div class="notice-page">
    <div class="banner">
      <div class="banner-text">민원 작성</div>
    </div>
    <table class="notice-detail-table">
      <tbody>
        <tr>
          <th>제목</th>
          <td colspan="3">
            <input v-model="writeForm.title" class="edit-input" />
          </td>
        </tr>
        <tr>
          <th>분류</th>
          <td colspan="3">
            <select v-model="writeForm.category" class="edit-select">
              <option value="공지">공지</option>
              <option value="안내">안내</option>
              <option value="이벤트">이벤트</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td colspan="3" class="content-cell">
            <textarea v-model="writeForm.content" class="edit-textarea"></textarea>
          </td>
        </tr>
        <!-- 공개/비공개 체크박스 추가 -->
        <tr>
          <th>공개여부</th>
          <td colspan="3">
            <label>
              <input
                type="checkbox"
                v-model="isPublic"
              />
              공개
            </label>
            <span style="margin-left:10px;color:#888;">(체크 해제 시 비공개)</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn-area">
      <button class="cancel-btn" @click="goList">취소</button>
      <button class="save-btn" @click="saveWrite">저장</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const writeForm = ref({
  title: '',
  category: '',
  content: '',
  studentId: '',
  publics: 'Y' // 기본값 공개
})
const isPublic = ref(true) // 체크박스 상태(기본 공개)

const authStore = useAuthStore()

// 체크박스와 writeForm.publics 동기화
watch(isPublic, (val) => {
  writeForm.value.publics = val ? 'Y' : 'N'
}, { immediate: true })

function goList() {
  router.push('/stu/complain')
}

async function saveWrite() {
  try {
    writeForm.value.studentId = authStore.studentId
    await axios.post('/api/complain/save', writeForm.value)
    alert('글이 등록되었습니다.')
    router.push('/stu/complain')
  } catch (error) {
    console.error('글 등록 실패:', error)
    alert('글 등록에 실패했습니다.')
  }
}
</script>


<style scoped>
.notice-page {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding-bottom: 40px;
}

.banner {
  position: relative;
  width: 100%;
  height: 120px;
  background-image: url('@/assets/laundry.png');
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  margin-bottom: 24px;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 32px;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

.notice-detail-table {
  width: 100%;
  max-width: 900px;
  margin: 0 auto 24px auto;
  border-collapse: collapse;
  font-size: 15px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.notice-detail-table th,
.notice-detail-table td {
  border-bottom: 1px solid #e5e5e5;
  padding: 12px 10px;
  text-align: left;
}

.notice-detail-table th {
  background: #e6f6fd;
  color: #222;
  font-weight: 600;
  width: 100px;
}

.notice-detail-table .content-cell {
  min-height: 180px;
  background: #f9f9f9;
}

.edit-input, .edit-select, .edit-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.edit-textarea {
  min-height: 200px;
  resize: vertical;
}

.btn-area {
  text-align: right;
  max-width: 900px;
  margin: 0 auto;
}

.cancel-btn {
  background: #fff;
  color: #555;
  border: 1px solid #ddd;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.save-btn {
  background: #2bb3e5;
  color: #fff;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

@media (max-width: 700px) {
  .notice-detail-table, .btn-area {
    max-width: 100%;
    font-size: 13px;
  }
  .banner-text {
    font-size: 22px;
  }
}
</style>
