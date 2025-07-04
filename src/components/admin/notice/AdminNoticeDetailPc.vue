<template>
  <div class="notice-page">
    <div class="banner">
      <div class="banner-text">공지사항</div>
    </div>
    <!-- 상세/수정 테이블 -->
    <table class="notice-detail-table">
      <tbody>
        <tr>
          <th>제목</th>
          <td colspan="3" v-if="!isEditMode">{{ notice.title }}</td>
          <td colspan="3" v-else>
            <input v-model="editForm.title" class="edit-input" />
          </td>
        </tr>
        <tr>
          <th>분류</th>
          <td colspan="3" v-if="!isEditMode">{{ notice.category }}</td>
          <td colspan="3" v-else>
            <select v-model="editForm.category" class="edit-select">
              <option value="공지">공지</option>
              <option value="안내">안내</option>
              <option value="이벤트">이벤트</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>작성자</th>
          <td>{{ notice.name }}</td>
          <th>작성일</th>
          <td>{{ notice.regDate ? notice.regDate.substring(0, 10) : '' }}</td>
        </tr>
        <tr>
          <th>내용</th>
          <td colspan="3" class="content-cell">
            <div v-if="!isEditMode" class="notice-content">{{ notice.content }}</div>
            <textarea v-else v-model="editForm.content" class="edit-textarea"></textarea>
          </td>
        </tr>
        <tr>
          <th>조회수</th>
          <td colspan="3">{{ notice.views }}</td>
        </tr>
      </tbody>
    </table>
    <div class="btn-area">
      <template v-if="!isEditMode">
        <button class="edit-btn" @click="enterEditMode">수정</button>
        <button class="back-btn" @click="goList">목록으로</button>
      </template>
      <template v-else>
        <button class="cancel-btn" @click="cancelEdit">취소</button>
        <button class="save-btn" @click="saveEdit">저장</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const notice = ref({})
const isEditMode = ref(false)
const editForm = ref({
  title: '',
  category: '',
  content: ''
})

function goList() {
  router.push('/admin/notice')
}

onMounted(async () => {
  const id = Number(route.params.id)
  try {
    const response = await axios.get(`/api/notice/${id}`)
    notice.value = response.data
    editForm.value = {
      title: response.data.title,
      category: response.data.category,
      content: response.data.content
    }
  } catch (error) {
    console.error('공지사항 상세 조회 실패:', error)
  }
})

function enterEditMode() {
  isEditMode.value = true
}

function cancelEdit() {
  isEditMode.value = false
}

async function saveEdit() {
  try {
    const id = Number(route.params.id)
    await axios.put(`/api/notice/edit/${id}`, editForm.value)
    // 수정된 데이터 다시 불러오기
    const response = await axios.get(`/api/notice/${id}`)
    notice.value = response.data
    isEditMode.value = false
  } catch (error) {
    console.error('수정 실패:', error)
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

/* 상세 테이블 스타일 */
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

.notice-detail-table td {
  color: #222;
}

.notice-detail-table .content-cell {
  min-height: 180px;
  background: #f9f9f9;
}

.notice-content {
  white-space: pre-line;
  font-size: 15px;
  color: #222;
}

/* 버튼 영역 */
.btn-area {
  text-align: right;
  max-width: 900px;
  margin: 0 auto;
}
.back-btn {
  background: #2bb3e5;
  color: #fff;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.back-btn:hover {
  background: #1991c6;
}

/* 반응형 */
@media (max-width: 700px) {
  .notice-detail-table, .btn-area {
    max-width: 100%;
    font-size: 13px;
  }
  .banner-text {
    font-size: 22px;
  }
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
.edit-btn, .save-btn {
  background: #2bb3e5;
  color: #fff;
}
.cancel-btn {
  background: #fff;
  color: #555;
  border: 1px solid #ddd;
}
</style>
