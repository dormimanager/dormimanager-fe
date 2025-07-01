<template>
  <div class="banner">
    <div class="banner-text">기숙사 스터디룸 예약</div>
  </div>
  <div class="wrapper">
    <div class="guide">
      <h2 class="title">기숙사 스터디룸 예약방법/주의사항</h2>
      <table class="study-table">
        <tr>
          <th class="label-cell">스터디룸<br />예약방법</th>
          <td class="content-cell">
            1. 원하는 위치 선택<br />
            2. 원하는 방 선택<br />
            3. 원하는 시간 예약<br />
            <span class="note">※ 단, 한 타임당 1시간 30분(90분)으로 제한.</span>
          </td>
          <th class="label-cell">스터디룸<br />주의사항</th>
          <td class="content-cell">
            • 다 사용하고 나면 사용완료 해주기<br />
            • 음식 섭취 금지<br />
            • 퇴실 전 뒷정리 필수<br />
            • 작은 소리로 대화하기
          </td>
        </tr>
      </table>
    </div>

    <div class="map">
      <h2 class="title">세탁실 배치도</h2>
      <img src="@/assets/studyroom-map.png" alt="스터디룸 배치도" class="layout-image" />
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

      <div class="study">
        <div class="study-card">
          <img src="@/assets/study-icon.png" alt="스터디룸" class="study-image" />
          <button class="reserve-btn">예약하기</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const selectedBuilding = ref('')
const buildings = ['1동', '2동', '3동']

</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: 200px;
  background-image: url('@/assets/studyroom.png');
  background-size: cover;
  background-position: center 70%;
  background-repeat: no-repeat;
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

.guide {
  max-width: 800px;
  margin: 30px;
  padding : 0 10px;
  font-family: sans-serif;
  text-align: left;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: left;
}

.study-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  margin-bottom: 60px;
}

.label-cell {
  width: 150px;
  height : 180px;
  background: #bde5ff;
  text-align: center;
  font-weight: bold;
  border: 1px solid #aaa;
  font-size: 18px;
}

.content-cell {
  width: 300px;
  padding: 12px;
  border: 1px solid #aaa;
  background: white;
  font-size: 14px;
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

li {
  margin-bottom: 5px;
  font-size: 14px;
}

.note {
  color: #d33;
  font-size: 13px;
  margin-top: 5px;
}

.reservation {
  margin : 30px;
}

.choice {
  text-align: left;
}


.study{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
}



.study-card {
  width: 180px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.study-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-top: 10px;
  margin-bottom: 10px;
}

.study-id {
  font-size: 16px;
  margin-bottom: 8px;
}

.reserve-btn {
  background-color: #79c1ec;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.reserve-btn:hover {
  background-color: #5da8d7;
}
</style>