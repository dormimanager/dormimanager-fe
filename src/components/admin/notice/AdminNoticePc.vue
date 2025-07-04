<template>
  <div class="notice-page">
    <div class="banner">
      <div class="banner-text">공지사항</div>
    </div>
    <div class="notice-content">
      <div class="search-area">
        <select v-model="searchType" class="search-select">
          <option value="title">제목</option>
        </select>
        <input
          v-model="searchKeyword"
          placeholder="검색어를 입력하세요."
          class="search-input"
        />
        <button @click="onSearch" class="search-btn">검색</button>
        <button @click="onWrite" class="write-btn">작성</button>
      </div>
      <table class="notice-table">
        <thead>
            <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>등록일</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, idx) in paginatedPosts" :key="post.id" @click="goDetail(post.id)">
            <td>{{ startIndex + idx + 1 }}</td>
            <td class="td-title">{{ post.title }}</td>
            <td>{{ post.name }}</td>
            <td>{{ post.views }}</td>
            <td>{{ post.regDate ? post.regDate.substring(0, 10) : ''  }}</td>
            </tr>
            <tr v-if="paginatedPosts.length === 0">
            <td colspan="5">게시글이 없습니다.</td>
            </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <span v-for="page in totalPages" :key="page" class="page-btn">
          <button
            @click="goToPage(page)"
            :class="{ active: page === currentPage }"
          >{{ page }}</button>
        </span>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const posts = ref([])
const router = useRouter()

const searchType = ref('title')
const searchKeyword = ref('')
const filteredPosts = computed(() => {
  if (!searchKeyword.value) return posts.value
  return posts.value.filter(post =>
    post[searchType.value].toLowerCase().includes(searchKeyword.value.toLowerCase())
  )
})

onMounted(async () => {
  const res = await axios.get('/api/notice/get')
  posts.value = res.data
})

// function goDetail(id) {
//   router.push(`/board/${id}`)
// }

const postsPerPage = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * postsPerPage)
const paginatedPosts = computed(() =>
  filteredPosts.value.slice(startIndex.value, startIndex.value + postsPerPage)
)

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function goToPage(page) {
  currentPage.value = page
}
function onSearch() {
  currentPage.value = 1
}
function onWrite() {
  router.push('/admin/notice/write')
}

async function increaseViews(id) {
  try {
    await axios.post('/api/notice/increaseView', { id })
    // 조회수 증가 후, 목록의 해당 게시글 조회수도 1 증가
    const post = posts.value.find(p => p.id === id)
    if (post) post.views += 1
  } catch (error) {
    console.error('조회수 증가 실패', error)
  }
}

async function goDetail(id) {
  await increaseViews(id)
  router.push(`/admin/notice/${id}`)
}
</script>

<style scoped>
.notice-page {
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

.notice-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 16px 40px;
}

.search-area {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.search-select,
.search-input {
  height: 32px;
  padding: 0 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-btn {
  height: 32px;
  background: #4FC3F7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
}

.write-btn {
  height: 32px;
  background: #4FC3F7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
  margin-left: auto;
}

.notice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
}

.notice-table th,
.notice-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.notice-table th {
  background: #B3E5FC;
  font-weight: bold;
}

.notice-table tr:nth-child(even) {
  background: #f2f2f2;
}

.notice-table tr:hover {
  background: #e9e9e9;
}

.td-title {
  text-align: left;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.pagination button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button.active {
  background: #4FC3F7;
  color: white;
  border-color: #4FC3F7;
  font-weight: bold;
}
</style>
