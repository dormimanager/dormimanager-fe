<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>분실물 등록</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label>이미지 업로드:</label>
          <input type="file" @change="handleImage" />
          <div v-if="preview">
            <img :src="preview" alt="미리보기" width="100" />
          </div>
        </div>
        <div>
          <label>이름:</label>
          <input v-model="name" required />
        </div>
        <div>
          <label>분류:</label>
          <select v-model="category" required>
            <option value="" disabled>선택하세요</option>
            <option value="전자기기">전자기기</option>
            <option value="지갑/카드">지갑/카드</option>
            <option value="의류">의류</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div>
          <label>상세설명:</label>
          <textarea v-model="description" required />
        </div>
        <div>
          <label>발견날짜:</label>
          <input type="date" v-model="foundDate" required />
        </div>
        <div>
          <label>발견 장소:</label>
          <input v-model="foundLocation" required />
        </div>
        <div class="btns">
          <button type="submit">저장</button>
          <button type="button" @click="emit('close')">닫기</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['close']);
import axios from 'axios';

const name = ref('');
const category = ref('');
const description = ref('');
const foundDate = ref('');
const foundLocation = ref('');
const imageFile = ref(null);
const preview = ref('');

function handleImage(e) {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;
    preview.value = URL.createObjectURL(file);
  }
}

async function handleSubmit() {
  if (!imageFile.value) {
    alert('이미지를 등록해주세요.');
    return;
  }
  const formData = new FormData();
  formData.append('image', imageFile.value);
  formData.append('name', name.value);
  formData.append('category', category.value);
  formData.append('description', description.value);
  formData.append('foundDate', foundDate.value);
  formData.append('foundLocation', foundLocation.value);

  try {
    await axios.post('/api/lost-items/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('등록되었습니다!');
    // 값 초기화
    name.value = '';
    category.value = '';
    description.value = '';
    foundDate.value = '';
    foundLocation.value = '';
    imageFile.value = null;
    preview.value = '';
    emit('saved');
    emit('close');
  } catch (err) {
    alert('등록 실패: ' + (err.response?.data?.message || err.message));
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; left: 0; top: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.36); display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff; padding: 30px 26px 22px 26px; border-radius: 15px; min-width: 340px; box-shadow: 0 4px 32px 0 rgba(54,80,115,0.18);
  animation: popIn 0.2s;
}
@keyframes popIn {
  from { transform: scale(0.95); opacity: 0.7; }
  to   { transform: scale(1);   opacity: 1;   }
}

/* 폼 디자인 */
.modal-content label {
  display: block;
  margin: 11px 0 5px 0;
}
.modal-content input[type="text"],
.modal-content input[type="date"],
.modal-content textarea,
.modal-content select {
  width: 100%;
  padding: 8px;
  border: 1px solid #d2d2e3;
  border-radius: 6px;
  margin-bottom: 6px;
  font-size: 1rem;
  background: #fafbff;
}
.modal-content textarea {
  min-height: 54px;
  resize: vertical;
}

.modal-content input[type="file"] {
  margin-bottom: 5px;
}

.modal-content img {
  margin-top: 3px;
  border-radius: 6px;
  max-width: 110px;
  background: #eef0f7;
  border: 1px solid #e0e3e8;
}

.btns {
  text-align: right;
  margin-top: 17px;
  display: flex;
  gap: 10px;
}
.btns button {
  background: #3478f6;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  padding: 9px 22px;
  cursor: pointer;
  transition: background 0.12s;
}
.btns button[type=button] {
  background: #e5e5eb;
  color: #505060;
}
.btns button:hover {
  background: #2459b6;
}
.btns button[type=button]:hover {
  background: #b5b7bd;
}
</style>
