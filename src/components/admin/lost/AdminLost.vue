<template>
  <div class="lost-page">
    <div class="banner">
      <div class="banner-text">분실물</div>
    </div>
      <div class="lost-items-container">
      <!-- 상단 검색/필터 박스 -->
      <div class="search-box">
        <div>
          <label>분류명</label>
          <select v-model="filters.category">
            <option value="">선택</option>
            <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div>
          <label>기간</label>
          <input type="date" v-model="filters.startDate" />
          ~
          <input type="date" v-model="filters.endDate" />
        </div>
        <div>
          <label>분실자명</label>
          <input v-model="filters.owner" placeholder="" />
        </div>
        <div>
          <label>습득품명</label>
          <input v-model="filters.itemName" placeholder="검색어를 입력하세요." />
        </div>
        <button @click="fetchItems" class="search-btn">검색</button>
      </div>
      <!-- 등록하기 버튼 -->
      <button class="register-btn" @click="showModal = true">등록하기</button>

      <!-- 습득물 카드 리스트 -->
      <div class="item-grid">
        <div v-for="item in items" :key="item.id" class="item-card">
          <div class="item-img-wrapper">
            <img v-if="item.imageUrl" :src="item.imageUrl" alt="이미지" />
          </div>
          <div class="item-desc">
            <div class="item-name">{{ item.itemName }}</div>
            <div class="item-date">
              습득일자: {{ item.foundDate ? item.foundDate.substr(0, 10) : '' }}
            </div>
          </div>
        </div>
      </div>
      <!-- 팝업 -->
      <LostItemModal
        v-if="showModal"
        @close="showModal = false"
        @saved="fetchItems"
      />
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LostItemModal from './AdminLostModal.vue';
import axios from 'axios';

const showModal = ref(false);
const items = ref([]);

// 카테고리 드롭다운 예시 (API에서 받아올 수도 있음)
const categoryOptions = [
  '의류', '지갑/카드', '전자기기', '액세서리', '기타'
];

const filters = ref({
  category: '',
  startDate: '',
  endDate: '',
  owner: '',
  itemName: ''
});

// 아이템에 카테고리별 아이콘/프리셋(간단화, 실제로는 아이콘 컴포넌트 권장)
function withCategoryIcon(list) {
  const icons = {
    '의류': '👟',
    '지갑/카드': '👛',
    '전자기기': '📱',
    '액세서리': '💍',
    '기타': '📦'
  };
  return list.map(i => ({ ...i, categoryIcon: icons[i.category] || '📦' }));
}

// API 예시, 실제로 쿼리파라미터 맞게 fetch
async function fetchItems() {
  // 1. 파라미터 객체 준비
  const params = {};
  if (filters.value.category) params.category = filters.value.category;
  if (filters.value.startDate) params.startDate = filters.value.startDate;
  if (filters.value.endDate) params.endDate = filters.value.endDate;
  if (filters.value.owner) params.owner = filters.value.owner;
  if (filters.value.itemName) params.itemName = filters.value.itemName;
  try {
    // 2. Spring Boot API GET 호출 (예시 URL: /api/lost-items)
    const res = await axios.get('/api/lost-items/get', { params });
    // 3. 상태 갱신
    items.value = withCategoryIcon(res.data); //← DB에서 받아온 배열
  } catch(e) {
    alert('목록을 불러오는데 실패했습니다.');
    items.value = [];
  }
}

// 진입 시 최초 조회
onMounted(fetchItems);

</script>

<style scoped>
.lost-page {
  width: 100%;
  min-height: 100vh;
  background: #f9f9f9;
}

.banner {
  position: relative;
  width: 100%;
  height: 200px;
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
  font-size: 40px;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

body {
  font-family: 'Apple SD Gothic Neo', '맑은 고딕', Arial, sans-serif;
  background: #f5f6fa;
  margin: 0;
}

.register-btn {
  background: #3478f6;
  border: none;
  color: #fff;
  padding: 12px 28px;
  font-size: 1rem;
  border-radius: 24px;
  cursor: pointer;
  margin: 24px 0 12px 0;
  transition: background 0.2s;
}
.register-btn:hover {
  background: #2459b6;
}

.item-grid {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  padding: 16px 0;
  justify-content: flex-start;
}

.item-card {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  width: 280px;
  box-shadow: 0 2px 10px 0 rgba(34,56,75,0.08);
  padding: 18px 14px 14px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 270px;
}

.item-img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 8px;
  background: #eef0f5;
}
.item-img-wrapper img {
  width: 200px;      /* 원하는 너비(px, %, rem 등) */
  height: 200px;     /* 원하는 높이 */
  object-fit: cover; /* 이미지를 비율에 맞게 크롭 */
  border-radius: 10px; /* 기존 스타일 유지 시 */
  background: #eef0f5; /* 필요시 배경색 */
  display: block;
  margin-bottom: 8px; /* 간격 */
}
.item-title {
  margin: 2px 0 8px 0;
  font-weight: bold;
  font-size: 1.12rem;
}

.item-info p {
  margin: 2px 0;
  font-size: 0.96rem;
  color: #444;
}
</style>
