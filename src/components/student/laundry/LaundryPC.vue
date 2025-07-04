<template>
  <div class="banner">
    <div class="banner-text">기숙사 세탁방 예약</div>
  </div>
  <div class="wrapper">
    <div class="guide">
      <h2 class="title">기숙사 세탁방 예약/사용방법</h2>
      <div class="table-wrapper">
        <table class="laundry-table">
          <tr>
            <th class="label-cell">세탁방<br />예약방법</th>
            <td class="content-cell">
              1. 원하는 위치 선택<br />
              2. 원하는 세탁기/건조기 선택<br />
              3. 원하는 시간 예약<br />
              <span class="note">※ 단, 한 타임당 1시간 30분(90분)으로 제한.</span>
            </td>
            <th class="label-cell">세탁방<br />사용방법</th>
            <td class="content-cell">
              1. 전원 스위치 켜기<br />
              2. 세제와 세탁물을 넣기<br />
              3. 금액 맞게 투입<br />
              4. 동작/일시정지 버튼 누르기
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="map">
      <h2 class="title">세탁실 배치도</h2>
      <div class="building-tabs">
        <button
            v-for="(building, idx) in buildings"
            :key="building"
            :class="['tab-btn', { active: selectedTab === idx }]"
            @click="selectedTab = idx"
        >
          {{ building }}
        </button>
      </div>
      <div class="center-image-wrapper">
        <img :src="laundryImages[selectedTab]" alt="세탁실 배치도" class="layout-image" />
      </div>
      <div class="table-wrapper">
        <table class="building-machine-table">
          <thead>
          <tr>
            <th>동</th>
            <th>구분</th>
            <th>수량</th>
            <th>위치</th>
            <th>사용 가능 시간</th>
            <th>사용 요금</th>
            <th>설치 연도</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td rowspan="2">1동</td>
            <td>세탁기</td>
            <td>4대</td>
            <td>1층 세탁실</td>
            <td>06:00~23:00</td>
            <td>1회 1,000원</td>
            <td>2022</td>
          </tr>
          <tr>
            <td>건조기</td>
            <td>2대</td>
            <td>1층 세탁실</td>
            <td>06:00~23:00</td>
            <td>1회 500원</td>
            <td>2022</td>
          </tr>
          <tr>
            <td rowspan="2">2동</td>
            <td>세탁기</td>
            <td>2대</td>
            <td>지하 1층</td>
            <td>05:00~22:00</td>
            <td>1회 1,000원</td>
            <td>2020</td>
          </tr>
          <tr>
            <td>건조기</td>
            <td>1대</td>
            <td>지하 1층</td>
            <td>05:00~22:00</td>
            <td>1회 500원</td>
            <td>2020</td>
          </tr>
          <tr>
            <td rowspan="2">3동</td>
            <td>세탁기</td>
            <td>3대</td>
            <td>1층 외부</td>
            <td>06:00~24:00</td>
            <td>1회 1,000원</td>
            <td>2023</td>
          </tr>
          <tr>
            <td>건조기</td>
            <td>1대</td>
            <td>1층 외부</td>
            <td>06:00~24:00</td>
            <td>1회 500원</td>
            <td>2023</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="reservation">
      <h2 class="title">예약하기</h2>
      <div class="choice">
        <label for="building">동 선택 </label>
        <select id="building" v-model="selectedBuilding">
          <option disabled value="">선택하기</option>
          <option v-for="building in buildings" :key="building">{{ building }}</option>
        </select>
      </div>
      <div class="laundry-machines">
        <div class="machine-card">
          <img src="@/assets/machine-icon.png" alt="세탁기" class="machine-image" />
          <button class="reserve-btn" @click="onReserveClick">예약</button>
          <ReservationForm v-if="showModal"
                           v-model:show="showModal"
                           :selected-building="selectedBuilding"
                           :laundry-id="selectedMachineId"
                           @close="showModal = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReservationForm from "@/components/student/ReservationForm.vue";
const showModal = ref(false)

const selectedBuilding = ref('')
const buildings = ['1동', '2동', '3동']

function onReserveClick() {
  if (!selectedBuilding.value) {
    alert('동을 먼저 선택하세요.');
    return;
  }
  showModal.value = true;
}

const laundryImages = [
  require('@/assets/laundry-map1.png'), // 1동 이미지
  require('@/assets/laundry-map2.png'), // 2동 이미지
  require('@/assets/laundry-map3.png'), // 3동 이미지
]
const selectedTab = ref(0)
</script>

<style scoped>
/* 기본 스타일 */
.wrapper {
  max-width: 1200px;
  padding: 0 30px;
  margin: 0 auto;
  box-sizing: border-box;
}
.banner {
  position: relative;
  width: 100%;
  height: 250px;
  background-image: url('@/assets/laundry.png');
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
}
.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 50px;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}
.guide, .map, .reservation {
  margin: 30px 0;
  padding: 0;
  font-family: sans-serif;
  text-align: left;
}

.building-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.tab-btn {
  background: #eee;
  border: none;
  padding: 8px 22px;
  margin: 0 6px;
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.tab-btn.active {
  background: #79c1ec;
  color: #fff;
  font-weight: bold;
}
.center-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
  margin-top: 100px;
}
.laundry-table, .building-machine-table {
  border-collapse: collapse;
  table-layout: fixed;
  margin-bottom: 60px;
  width: 100%;
}
.label-cell {
  width: 130px;
  height: 200px;
  background: #bde5ff;
  text-align: center;
  font-weight: bold;
  border: 1px solid #aaa;
  font-size: 20px;
}
.content-cell {
  width: 330px;
  padding: 10px;
  border: 1px solid #aaa;
  background: white;
  font-size: 17px;
}
.note {
  color: #d33;
  font-size: 13px;
  margin-top: 5px;
}
.layout-image {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 70px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  width: 700px;
  height: 400px;
}
.building-machine-table {
  width: 100%;
  border-collapse: collapse;
  margin: 40px 0;
  font-size: 14px;
  text-align: center;
}
.building-machine-table th,
.building-machine-table td {
  border: 1px solid #ccc;
  padding: 10px;
}
.building-machine-table th {
  background-color: #bde5ff;
  font-weight: bold;
}
.choice {
  text-align: left;
  font-size: 20px;
  margin-bottom: 20px;
}
select {
  margin-left: 15px;
  padding: 8px;
  font-size: 16px;
  width: 120px;
  height: 38px;
}
.laundry-machines {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
}
.machine-card {
  width: 180px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 50px;
  text-align: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}
.machine-image {
  width: 140px;
  height: 140px;
  object-fit: contain;
  margin-top: 5px;
  margin-bottom: 30px;
}
.reserve-btn {
  background-color: #79c1ec;
  width: 190px;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 22px;
}
.reserve-btn:hover {
  background-color: #5da8d7;
}

/* 테이블 가로 스크롤용 */
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 20px;
}
.laundry-table,
.building-machine-table {
  min-width: 560px; /* 테이블이 작아지지 않도록 최소 너비 지정 */
  width: 100%;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .wrapper {
    max-width: 100%;
    padding: 0 12px;
  }
  .banner {
    height: 120px;
  }
  .banner-text {
    font-size: 24px;
  }
  .guide, .map, .reservation {
    margin: 18px 0;
  }
  .title {
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  .laundry-table,
  .building-machine-table {
    font-size: 12px;
  }
  .label-cell,
  .content-cell,
  .building-machine-table th,
  .building-machine-table td {
    padding: 5px;
    font-size: 12px;
  }
  .layout-image {
    width: 100%;
    height: auto;
    padding: 0;
    margin-top: 10px;
  }
  .choice {
    font-size: 16px;
  }
  select {
    width: 100px;
    font-size: 14px;
    height: 32px;
  }
  .laundry-machines {
    flex-direction: column;
    gap: 15px;
  }
  .machine-card {
    width: 100%;
    height: auto;
    padding: 18px 0;
    margin-bottom: 8px;
  }
  .machine-image {
    width: 80px;
    height: 80px;
    margin-bottom: 16px;
  }
  .reserve-btn {
    width: 90%;
    font-size: 18px;
    padding: 8px 0;
  }
}
</style>
