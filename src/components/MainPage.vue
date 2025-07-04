<template>
  <div class="dashboard-root">
    <!-- 1행: 프로필+예약/택배, 벌점 -->
    <div class="profile-area">
      <div class="profile-info">
        <img class="profile-img" referrerpolicy="no-referrer" :src="user.imgUrl" />
        <div>
          <div class="profile-name">{{ user.name }}</div>
          <div class="profile-major">{{ user.major }}</div>
          <button class="profile-btn" @click="mypage">개인 정보 수정</button>
        </div>
      </div>
      <div class="reserve-box">
        <div class="reserve-item">
          <img src="https://cdn-icons-png.flaticon.com/512/747/747310.png" class="icon" />
          <span>예약</span>
          <span class="reserve-num">4</span>
        </div>
        <hr />
        <div class="reserve-item">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" class="icon" />
          <span>택배</span>
          <span class="reserve-num">0</span>
        </div>
      </div>
    </div>
    <div class="score-area">
      <div class="score-bars">
        <div class="score-bar">
          <span class="score-label avg">평균</span>
          <div class="bar avg" :style="{ width: avgScore * 10 + 'px' }"></div>
          <span class="score-value">{{ avgScore }}</span>
        </div>
        <div class="score-bar">
          <span class="score-label me">나</span>
          <div class="bar me" :style="{ width: myScore * 10 + 'px' }"></div>
          <span class="score-value">{{ myScore }}</span>
        </div>
      </div>
      <div class="score-info">
        <div>
          퇴소까지 <span class="score-remain">12점</span> 남았습니다
        </div>
        <button class="score-detail-btn">벌점 상세보기</button>
      </div>
    </div>
    <!-- 2~3행: 달력, 공지, 민원, 예약/조회 -->
    <div class="calendar-area">
      <div class="calendar-title">달력</div>
      <img
        class="calendar-img"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
        alt="달력"
      />
    </div>
    <div class="notice-area">
      <div class="notice-header">
        <span>공지</span>
        <button class="tab-btn" @click="notice">전체</button>
      </div>
      <div class="notice-list"></div>
    </div>
    <div class="complain-area">
      <div class="complain-header">
        <span>민원</span>
        <button class="tab-btn" @click="complain">전체</button>
      </div>
      <div class="complain-list"></div>
    </div>
    <div class="reserve-action-area">
      <div class="action-title">예약하기</div>
      <div class="action-btns">
        <div class="action-btn laundry">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" />
          <span @click="laundry">세탁</span>
        </div>
        <div class="action-btn study">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" />
          <span @click="study">스터디</span>
        </div>
      </div>
    </div>
    <div class="lookup-action-area">
      <div class="action-title">조회하기</div>
      <div class="action-btns">
        <div class="action-btn room">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" />
          <span>방배정</span>
        </div>
        <div class="action-btn lost">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" />
          <span>분실물</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import axios from 'axios'
import logoImg from '@/assets/logo.png'

const authStore = useAuthStore()
const router = useRouter()

const token = authStore.token
const studentId = authStore.studentId
let user = reactive({})
const apiUrl = process.env.VUE_APP_API_URL 

const avgScore = ref(8) // 평균 점수
const myScore = ref(3) // 내 점수

onMounted(async () => {
  if (studentId) {
    try {
      const response = await axios.get('/api/auth/getInfo', {
        params: { studentId },
        headers: { Authorization: `Bearer ${token}` }
      })
      Object.assign(user, response.data)
      user.imgUrl = response.data.imgUrl
        ? `${apiUrl}${response.data.imgUrl}`
        : logoImg
    } catch (error) {
      console.error('학생 정보 조회 실패:', error)
    }
  }
})

function laundry() {
  router.push('/stu/laundry')
}
function mypage() {
  router.push('/stu/mypage')
}
function notice() {
  router.push('/stu/notice')
}
function complain() {
  router.push('/stu/complain')
}
function study() {
  router.push('/stu/study')
}
</script>

<style scoped>
.dashboard-root {
  display: grid;
  grid-template-columns: 2fr 1.2fr 1.2fr 1.2fr;
  grid-template-rows: 170px 360px 180px;
  gap: 18px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  padding: 16px 0 32px 0;
}

/* 1행 */
.profile-area {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 18px 24px;
  gap: 32px; /* 간격을 적절하게 조절 */
}
.profile-info {
  display: flex;
  align-items: center;
  gap: 18px;
  background: #f9fbfc;
  border: 2px solid #c5e6fa;
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(44, 160, 255, 0.09);
  padding: 18px 28px 18px 18px;
  transition: box-shadow 0.2s;
}
.profile-info:hover {
  box-shadow: 0 4px 24px 0 rgba(44, 160, 255, 0.18);
}
.profile-img {
  width: 80px; height: 80px; border-radius: 50%; background: #eee;
  border: 2px solid #b0dfff;
}
.profile-name { font-weight: bold; font-size: 18px; }
.profile-major { color: #555; font-size: 15px; }
.profile-btn { margin-top: 8px; background: #eee; border: none; border-radius: 4px; padding: 5px 14px; font-size: 13px; cursor: pointer; }
.reserve-box {
  background: #8ed1fc;
  border-radius: 12px;
  padding: 16px 32px;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 2px 8px 0 rgba(44,160,255,0.07);
}
.reserve-item {
  display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 500;
  margin: 6px 0;
}
.reserve-num { font-size: 22px; font-weight: bold; margin-left: 12px; }
.icon { width: 28px; }
hr { border: none; border-top: 1px solid #fff; margin: 10px 0; }

/* 벌점 */
.score-area {
  grid-column: 3 / 5;
  grid-row: 1 / 2;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 16px 0 16px 16px;
}
.score-bars { flex: 2; display: flex; flex-direction: column; justify-content: center; gap: 18px; }
.score-bar { display: flex; align-items: center; gap: 8px; }
.score-label { width: 40px; font-weight: bold; }
.bar { height: 18px; border-radius: 8px; transition: width 0.3s; }
.bar.avg { background: #ffb3b3; }
.bar.me { background: #8ed1fc; }
.score-value { font-size: 16px; font-weight: bold; margin-left: 8px; }
.score-info { flex: 1.2; display: flex; flex-direction: column; justify-content: center; align-items: center; border-left: 1px solid #bbb; padding-left: 18px; }
.score-remain { color: #2874f0; font-weight: bold; font-size: 18px; }
.score-detail-btn { margin-top: 10px; background: #eee; border: none; border-radius: 4px; padding: 6px 18px; font-size: 14px; cursor: pointer; }

/* 2~3행: 달력 영역이 두 행을 모두 차지! */
.calendar-area {
  grid-column: 1 / 3;
  grid-row: 2 / 4;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.calendar-title { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
.calendar-img {
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 8px;
}

.notice-area {
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 8px 8px 0 8px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
}
.complain-area {
  grid-column: 4 / 5;
  grid-row: 2 / 3;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 8px 8px 0 8px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
}
.notice-header, .complain-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;
}
.tab-btn {
  background: #e6f6fd; border: none; border-radius: 8px; padding: 2px 14px; font-size: 13px; color: #555;
}
.notice-list, .complain-list { flex: 1; }

/* 3행: 예약/조회 */
.reserve-action-area {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lookup-action-area {
  grid-column: 4 / 5;
  grid-row: 3 / 4;
  background: #fff;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.action-title { font-weight: bold; font-size: 16px; margin-bottom: 6px; }
.action-btns { display: flex; gap: 8px; }
.action-btn {
  flex: 1;
  background: #e6f6fd;
  border-radius: 8px;
  padding: 10px 0 0 0;
  text-align: center;
  min-width: 90px;
  min-height: 80px;
  position: relative;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  border: 2px solid #b0e0ff;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.action-btn img { width: 48px; margin-bottom: 4px; }
.action-btn span {
  display: block;
  background: #8ed1fc;
  color: #fff;
  border-radius: 8px;
  padding: 2px 0;
  font-size: 16px;
  margin-top: 2px;
  width: 70px;
}

@media (max-width: 1100px) {
  .dashboard-root {
    grid-template-columns: 1fr;
    grid-template-rows: none;
    gap: 12px;
    padding: 4px;
  }
  .profile-area, .score-area, .calendar-area, .notice-area, .complain-area, .reserve-action-area, .lookup-action-area {
    grid-column: 1 / 2 !important;
    grid-row: auto !important;
  }
}
</style>
